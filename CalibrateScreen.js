// CalibrateScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getCameraCharacteristics } from './CameraCharacteristics';

export default function CalibrateScreen() {
    const [cameraCharacteristics, setCameraCharacteristics] = useState(null);

    useEffect(() => {
        console.log('getCameraCharacteristics:', getCameraCharacteristics); // Log the function
        // Fetch camera characteristics when the component mounts
        getCameraCharacteristics('0').then(characteristics => {
            setCameraCharacteristics(characteristics);
        }).catch(error => {
            console.error('Error fetching camera characteristics:', error);
        });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {cameraCharacteristics ? (
                <Text>{JSON.stringify(cameraCharacteristics, null, 2)}</Text>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
}
