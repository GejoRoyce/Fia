// SplashScreen.js

import React, { useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('InstructionScreen');
        }, 10000);

        // Cleanup function to clear the timer in case of component unmount
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'navy' }}>
            <Image
                source={require('./assets/logo.gif')} // Provide the path to your image
                style={{ width: 100, height: 100 }} // Adjust the width and height as needed
            />
            <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>
                Facial Image Acquisition App
            </Text>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>

            <Button 
            title="Go to Instruction Screen"
            onPress={() => {
             console.log('Button pressed');
            navigation.navigate('InstructionScreen');
            }}
            />
        
        </View>
    );
};

export default SplashScreen;
