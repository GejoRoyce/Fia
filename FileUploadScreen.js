// FileUploadScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { S3 } from 'aws-sdk';
import { useNavigation } from '@react-navigation/native';


const FileUploadScreen = ({ route }) => {
  const { deviceModel, userId, mobileOS, uploadedCount, focalLength, sensorSize} = route.params;
  const [uploadMessage, setUploadMessage] = useState('');


  // Function to upload the details to S3
  const uploadToS3 = async () => {
    try {
      const s3 = new S3({
        accessKeyId: 'AKIAZQ3DTYNAAT7XC4HM',
        secretAccessKey: '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',
        region: 'eu-west-2',
      });

      const Params = {
        Bucket: 'fiadatabucket',
        Key: `${userId}/${userId}-details.txt`,
        Body: JSON.stringify({ deviceModel, userId, mobileOS, uploadedCount, focalLength, sensorSize }),
      };
      await s3.upload(Params).promise();

      console.log('Details uploaded to S3 successfully');
      setUploadMessage('All data uploaded to server folder --- ');

    } catch (error) {
      console.error('Error uploading details to S3:', error);
      setUploadMessage('Error uploading data to server');

    }
  };

  const handleUploadPress = () => {
    setUploadMessage('Uploading data to server...');  
    uploadToS3();  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Before Upload</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.label}>Device Model:</Text>
          <Text style={styles.value}>{deviceModel}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.value}>{userId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Mobile OS:</Text>
          <Text style={styles.value}>{mobileOS}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Upload Count:</Text>
          <Text style={styles.value}>{uploadedCount}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Focal Length:</Text>
          <Text style={styles.value}>{focalLength} </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sensor Size:</Text>
          <Text style={styles.value}>{sensorSize.height} x {sensorSize.width}</Text>
        </View>
      </View>
      <Button title="Upload Details" onPress={handleUploadPress} />
      <Text style={styles.uploadMessage}>{uploadMessage}{userId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black',
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',  
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color:'black',

  },
  value: {
    flex: 1,
    textAlign: 'right',
    color:'black',
  },
  uploadMessage: {
    marginTop: 20,
    fontSize: 18,
    color: 'green', 
  },
});

export default FileUploadScreen;

