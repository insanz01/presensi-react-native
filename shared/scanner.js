import React, {useEffect} from 'react';
import {StyleSheet, AsyncStorage} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Scanner = ({navigation, route}) => {
  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  useEffect(() => {
    console.log(route.params?.scanned)
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      // setHasPermission(status === 'granted');
      navigation.setOptions({hasPermission: status === 'granted'})
    })();

    AsyncStorage.getItem('user', (error, result) => {
      if(result) {
        let userData = JSON.parse(result);
        console.log('user data', userData);
        console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
      }
    })
    
    navigation.setOptions({scanned: true});
    navigation.goBack();
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <BarCodeScanner
        onBarCodeScanned={route.params?.scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
  )
}

export default Scanner;