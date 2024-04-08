// App.js

import "./ignoreWarnings";
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import InstructionScreen from './InstructionScreen';
import CaptureScreen from './CaptureScreen';
import ImageViewerScreen from './ImageViewerScreen';
import FileUploadScreen from './FileUploadScreen';
import 'react-native-get-random-values';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="InstructionScreen" component={InstructionScreen} />
        <Stack.Screen name="CaptureScreen" component={CaptureScreen} />
        <Stack.Screen name="ImageViewerScreen" component={ImageViewerScreen} />
        <Stack.Screen name="FileUploadScreen" component={FileUploadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
















