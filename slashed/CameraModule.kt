// CameraModule.kt
package com.fia

import android.content.Context
import android.hardware.camera2.CameraAccessException
import android.hardware.camera2.CameraCaptureSession
import android.hardware.camera2.CameraDevice
import android.hardware.camera2.CameraManager
import android.hardware.camera2.CaptureRequest
import android.os.Handler
import android.util.Log
import androidx.annotation.NonNull
import com.facebook.react.bridge.*
import java.util.*

class CameraModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private lateinit var cameraDevice: CameraDevice

    override fun getName(): String {
        return "CameraModule"
    }

    @ReactMethod
    fun openCamera() {
        val cameraManager = reactContext.getSystemService(Context.CAMERA_SERVICE) as CameraManager
        try {
            val cameraId = cameraManager.cameraIdList[0] // Use the first camera
            val handler = Handler(reactContext.mainLooper)

            cameraManager.openCamera(cameraId, object : CameraDevice.StateCallback() {
                override fun onOpened(camera: CameraDevice) {
                    cameraDevice = camera
                    createPreviewSession(camera)
                }

                override fun onDisconnected(camera: CameraDevice) {
                    cameraDevice.close()
                }

                override fun onError(camera: CameraDevice, error: Int) {
                    cameraDevice.close()
                    Log.e("CameraModule", "Camera error: $error")
                }
            }, handler)
        } catch (e: CameraAccessException) {
            e.printStackTrace()
        }
    }

    private fun createPreviewSession(cameraDevice: CameraDevice) {
        val surfaceTexture = SurfaceTexture(0)
        val surface = Surface(surfaceTexture)

        try {
            val captureRequestBuilder = cameraDevice.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW)
            captureRequestBuilder.addTarget(surface)

            cameraDevice.createCaptureSession(listOf(surface), object : CameraCaptureSession.StateCallback() {
                override fun onConfigured(session: CameraCaptureSession) {
                    try {
                        val captureRequest = captureRequestBuilder.build()
                        session.setRepeatingRequest(captureRequest, null, null)
                    } catch (e: CameraAccessException) {
                        e.printStackTrace()
                    }
                }

                override fun onConfigureFailed(session: CameraCaptureSession) {
                    Log.e("CameraModule", "Failed to configure camera session")
                }
            }, null)
        } catch (e: CameraAccessException) {
            e.printStackTrace()
        }
    }
}
