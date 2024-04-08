// ImageViewerScreen.js

import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions, Button, Text } from 'react-native';
import { S3 } from 'aws-sdk';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const ImageViewerScreen = ({ route }) => {
    const navigation = useNavigation();
    const { deviceModel, userId, mobileOS, capturedImages, focalLength, sensorSize } = route.params;
    const [uploadedCount, setUploadedCount] = useState(0);

    const handleUpload = async () => {
        try {
            const s3 = new S3({
                accessKeyId: 'AKIAZQ3DTYNAAT7XC4HM',
                secretAccessKey: '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',
                region: 'eu-west-2',
            });

            await Promise.all(
                capturedImages.map(async (image, index) => {
                    const response = await fetch(image.uri);
                    const blob = await response.blob();
                    const filename = image.uri.split('/').pop();
                    const key = `${userId}/${filename}`;  
                    await s3.upload({
                        Bucket: 'fiadatabucket',
                        Key: key,
                        Body: blob,
                    }).promise();
                    console.log(`Image ${filename} uploaded successfully to folder ${userId}!`);
                    setUploadedCount(prevCount => prevCount + 1);
                })
            );
        } catch (error) {
            console.error('Error uploading images: ', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                {capturedImages.map((image, index) => (
                    <Image key={index} source={{ uri: image.uri }} style={styles.image} />
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <Button title={`Upload Images (${uploadedCount}/${capturedImages.length})`} onPress={handleUpload}/>
                <Button title="Next" onPress={() => navigation.navigate('FileUploadScreen', { deviceModel, userId, mobileOS, uploadedCount, focalLength, sensorSize  })} />
            </View>        
        </ScrollView>
    );
};

const windowWidth = Dimensions.get('window').width;
const imageWidth = windowWidth / 3;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: imageWidth,
        height: imageWidth,
        marginBottom: 10,
    },
});

export default ImageViewerScreen;
