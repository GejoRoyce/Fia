
// CaptureScreen.js 

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CaptureScreen = ({ navigation }) => {
  const [photoUris, setPhotoUris] = useState([]);
  const [captureIndex, setCaptureIndex] = useState(0); // Tracks the index of captured images
  const cameraRef = useRef(null);
  const prompts = [
    'Bring phone to your 12 o clock position and click on screen',
    'Move to 1 o clock position and click on screen',
    'Move to 2 o clock position and click on screen',
    'Move to 3 o clock position and click on screen',
    'Move slightly up, then move to 2 o clock position and click on screen',
    'In Upper level, move to 1 o clock position and click on screen',
    'In Upper level, move to 12 o clock position and click on screen',
    'In Upper level, move to 11 o clock position and click on screen',
    'In Upper level, move to 10 o clock position and click on screen',
    'In Upper level, move to 9 o clock position, now lower hands to initial level and click on screen',
    'Move to 10 o clock position and click on screen',
    'Move to 11 o clock position and click on screen',
    'Move to 12 o clock position, now lower the hand a phone lenght and click on screen',
    'In Lower level, move to 1 o clock position and click on screen',
    'In Lower level, move to 2 o clock position and click on screen',
    'In Lower level, move to 11 o clock position and click on screen',
    'In Lower level, move to 10 o clock position and click on screen',
    'Move back to initial Position. Images for 3D facial reconstruction captured successfully'
  ];

  useEffect(() => {
    // Request camera permissions, if needed
  }, []);

  useEffect(() => {
    // Speak the current prompt
  }, [captureIndex]);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 1, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        setPhotoUris(prevPhotoUris => [...prevPhotoUris, { uri: data.uri }]);
        // Increment capture index after taking the picture
        setCaptureIndex(prevIndex => prevIndex + 1);
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
        />
        {/* Your overlay and mask views */}
      </View>
      <View style={styles.promptContainer}>
        <Text style={styles.promptText}>{prompts[captureIndex]}</Text>
      </View>
      {captureIndex >= prompts.length && (
        <Button
          title="Go to ImageViewerScreen"
          onPress={() => navigation.navigate('ImageViewerScreen', { capturedImages: photoUris })}
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
