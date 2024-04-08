// CameraUtils.js

import { NativeModules } from 'react-native';

const { CameraManager } = NativeModules;

export const getFocalLength = async () => {
    try {
        const focalLength = await CameraManager.getCameraDetail('focalLength');
        console.log('Focal Length:', focalLength);
        return focalLength;
    } catch (error) {
        console.error('Error getting focal length:', error);
    }
};

export const getSensorInfoPhysicalSize = async () => {
    try {
        const sensorSize = await CameraManager.getCameraDetail('sensorSize');
        console.log('Sensor Info Physical Size:', sensorSize);
        return sensorSize;
    } catch (error) {
        console.error('Error getting sensor info physical size:', error);
    }
};

export const getLensIntrinsicCalibration = async () => {
    try {
        const calibration = await CameraManager.getCameraDetail('calibration');
        console.log('Lens Intrinsic Calibration:', calibration);
        return calibration;
    } catch (error) {
        console.error('Error getting lens intrinsic calibration:', error);
    }
};
