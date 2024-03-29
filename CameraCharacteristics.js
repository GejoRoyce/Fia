// CameraCharacteristics.js
import { NativeModules } from 'react-native';

const { CameraCharacteristicsModule } = NativeModules;

export function getCameraCharacteristics(cameraId) {
    return new Promise((resolve, reject) => {
        CameraCharacteristicsModule.getCameraCharacteristics(cameraId, (characteristics) => {
            resolve(characteristics);
        }, (error) => {
            reject(error);
        });
    });
}
