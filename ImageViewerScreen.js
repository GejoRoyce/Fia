import React from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions, Button } from 'react-native';
import { Storage } from 'aws-amplify';

const ImageViewerScreen = ({ route }) => {
    const { capturedImages } = route.params;

    const handleUpload = async () => {
        try {
            await Promise.all(
                capturedImages.map(async (image) => {
                    const response = await fetch(image.uri);
                    const blob = await response.blob();
                    const filename = image.uri.split('/').pop();
                    const folderName = generateUniqueFolderName(); // Generate a unique folder name
                    const key = `${folderName}/${filename}`; // Combine folder name and filename for the S3 key
                    await Storage.upload({
                        key: key,
                        body: blob,
                    });
                    console.log(`Image ${filename} uploaded successfully to folder ${folderName}!`);
                })
            );
        } catch (error) {
            console.error('Error uploading images: ', error);
        }
    };

    // Function to generate a unique folder name (you can customize this according to your requirements)
    const generateUniqueFolderName = () => {
        return `images-${Date.now()}`; // Using a timestamp as the folder name
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                {capturedImages.map((image, index) => (
                    <Image key={index} source={{ uri: image.uri }} style={styles.image} />
                ))}
            </View>
            <Button title="Upload Images" onPress={handleUpload} />
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
