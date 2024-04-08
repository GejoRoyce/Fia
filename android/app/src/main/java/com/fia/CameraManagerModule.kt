package com.fia;

import android.content.Context;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraManager;
import android.util.SizeF;
import com.facebook.react.bridge.*;

class CameraManagerModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "CameraManager";
    }

    @ReactMethod
    fun getCameraDetail(detailType: String, promise: Promise) {
        try {
            val manager = reactContext.getSystemService(Context.CAMERA_SERVICE) as CameraManager;
            for (cameraId in manager.cameraIdList) {
                val characteristics = manager.getCameraCharacteristics(cameraId);
                val cameraDirection = characteristics.get(CameraCharacteristics.LENS_FACING);
                if (cameraDirection != null && cameraDirection == CameraCharacteristics.LENS_FACING_FRONT) {
                    when (detailType) {
                        "focalLength" -> {
                            val focalLengths = characteristics.get(CameraCharacteristics.LENS_INFO_AVAILABLE_FOCAL_LENGTHS);
                            if (focalLengths != null && focalLengths.isNotEmpty()) {
                                promise.resolve(focalLengths[0]);
                            } else {
                                promise.reject("UNAVAILABLE", "Focal length not available.");
                            }
                            return;
                        }
                        "sensorSize" -> {
                            val sensorSize = characteristics.get(CameraCharacteristics.SENSOR_INFO_PHYSICAL_SIZE);
                            if (sensorSize != null) {
                                val resultMap = WritableNativeMap();
                                resultMap.putDouble("width", sensorSize.width.toDouble());
                                resultMap.putDouble("height", sensorSize.height.toDouble());
                                promise.resolve(resultMap);
                            } else {
                                promise.reject("UNAVAILABLE", "Sensor info physical size not available.");
                            }
                            return;
                        }
                        "calibration" -> {
                            val calibration = characteristics.get(CameraCharacteristics.LENS_INTRINSIC_CALIBRATION);
                            if (calibration != null) {
                                promise.resolve(calibration.toList());
                            } else {
                                promise.reject("UNAVAILABLE", "Lens intrinsic calibration not available.");
                            }
                            return;
                        }
                        else -> {
                            promise.reject("INVALID", "Invalid detail type.");
                            return;
                        }
                    }
                }
            }
            promise.reject("UNAVAILABLE", "Front camera not found or detail type not supported.");
        } catch (e: Exception) {
            promise.reject("ERROR", e.message);
        }
    }
}
