// CaptureScreen.js 

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Tts from 'react-native-tts';
import { useNavigation } from '@react-navigation/native';
import { getFocalLength, getSensorInfoPhysicalSize } from './CameraUtils';


const CaptureScreen = ({ route }) => {

  const navigation = useNavigation();
  const [photoUris, setPhotoUris] = useState([]);
  const { deviceModel, userId, mobileOS } = route.params;
  const [captureIndex, setCaptureIndex] = useState(0); 
  const [cameraReady, setCameraReady] = useState(false); 
  const [focalLength, setFocalLength] = useState(null);
  const [sensorSize, setSensorSize] = useState(null);
  const cameraRef = useRef(null);
  const prompts = [
    'Bring phone to your 12 o clock position and click on whitespace to capture',
    'without turning head, Move your hands to 1 o clock position and click on whitespace',
    'Move to 2 o clock position and click on whitespace',
    'Move to 3 o clock position and click on whitespace',
    'Move slightly up, tilt the phone bit forward, then move to 2 o clock position and click on whitespace',
    'In Upper level, move to 1 o clock position and click on whitespace',
    'In Upper level, move to 12 o clock position and click on whitespace',
    'In Upper level, move to 11 o clock position and click on whitespace',
    'In Upper level, move to 10 o clock position and click on whitespace',
    'In Upper level, move to 9 o clock position, now lower hands to initial level, tilt the phone to initial angle and click on whitespace',
    'Move to 10 o clock position in initial level and click on whitespace',
    'Move to 11 o clock position in initial level  and click on whitespace',
    'Move to 12 o clock position in initial level, now lower the hand a slight down, tilt the phone slighty backward and click on whitespace',
    'In Lower level, move to 1 o clock position and click on whitespace',
    'In Lower level, move to 2 o clock position and click on whitespace',
    'In Lower level, move to 11 o clock position and click on whitespace',
    'In Lower level, move to 10 o clock position and click on whitespace',
    'Move back to initial Position. If you have any facial deformities, capture them on this sequence else capture inital postures', 
    'If you have any other deformities, contain them on the screen and click on the whitespace to capture image, else capture the initial posture.',
    'All images sequence captured. Click on Initial posture to complete',
  ];

  useEffect(() => {
    // Fetch camera characteristics when camera is ready
    if (cameraReady && captureIndex === 0) {
      fetchCameraCharacteristics();
    }
  }, [cameraReady, captureIndex]);


  useEffect(() => {
    if (prompts[captureIndex]) {
      Tts.speak(prompts[captureIndex]);
    }
  }, [captureIndex]);

  const fetchCameraCharacteristics = async () => {
    try {
      const focalLengthValue = await getFocalLength();
      const sensorSizeValue = await getSensorInfoPhysicalSize();
      console.log('Focal Length:', focalLengthValue);
      console.log('Sensor Size:', sensorSizeValue);
      setFocalLength(focalLengthValue);
      setSensorSize(sensorSizeValue);
    } catch (error) {
      console.error('Error fetching camera characteristics:', error);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 1, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        if (data && data.uri) {
        setPhotoUris(prevPhotoUris => [...prevPhotoUris, { uri: data.uri }]);
        setCaptureIndex(prevIndex => prevIndex + 1);
      } else {
        console.log('Error: Captured image data is undefined.');
      }
      } catch (error) {
        console.log('Error taking picture: ', error);
      }
    }
  };

  const handleScreenPress = async () => {
    if (captureIndex < prompts.length) {
      await takePicture();
    } else {
      console.log("All images captured successfully. Click on Image Viewer to view images");
    }
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handleScreenPress}>
      <View style={styles.cameraContainer}>
        <RNCamera
          style={styles.camera}
          type={RNCamera.Constants.Type.front}
          captureAudio={false}
          ref={cameraRef}
          onCameraReady={() => setCameraReady(true)} 
        />
      </View>
      <View style={styles.promptContainer}>
        <Text style={styles.promptText}>{prompts[captureIndex]}</Text>
      </View>
      {captureIndex >= prompts.length && (
        <Button
          title="Go to ImageViewerScreen"
          onPress={() => navigation.navigate('ImageViewerScreen', { deviceModel, userId, mobileOS, capturedImages: photoUris, focalLength, sensorSize})}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskOuter: {
    // Define your mask styles
  },
  maskInner: {
    // Define your mask styles
  },
  promptContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  promptText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default CaptureScreen;
