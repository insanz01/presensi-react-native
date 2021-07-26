import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';

import * as Location from 'expo-location';

// image attribution <a href='https://www.freepik.com/vectors/school'>School vector created by katemangostar - www.freepik.com</a>

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const SubmitButton = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const MoveToBottom = (component) => {
  return (
    <View style={styles.bottom}>
      {component}
    </View>
  )
}

const Main = ({route, navigation}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isPresent, doPresent] = useState(false);
  const [label, setLabel] = useState('Kamu Belum Presensi');
  const [user, setUser] = useState({
    deviceID: '',
    username: '',
    present: false,
    location: {},
    manufacturer: ''
  });

  let icon = !isPresent ?
              require('../assets/main/before.png') :
              require('../assets/main/after.png');

  const handleSubmit = async () => {
    if(Object.keys(user.location).length == 0) {
      getLocation()
    }

    if(isPresent) {
      doPresent(false);
      setLabel('Kamu Belum Presensi');
    } else {
      doPresent(true);
      setLabel('Kamu Sudah Hadir');
    }
  }

  const getLocation = () => {
    // get location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});

      setUser({...user, location: loc});
    })();
  }

  useEffect(() => {
    if(!isLoaded) {
      AsyncStorage.getItem('user', (error, result) => {
        if(result) {
          data = JSON.parse(result);
          console.log(data);
          setUser({
            deviceID: data.deviceID,
            username: data.username,
            present: data.present,
            location: data.location,
            manufacturer: data.manufacturer
          });
          setLoaded(true);

        } else {
          console.error('Data tidak dapat dimuat');
        }
      });
    }
    
    if(isPresent) {
      console.log(user)
      navigation.navigate('Scanner');
    }

  }, [user]);

  // just for debugging
  const backToNature = () => {
    const user = {
      username: '',
      present: false,
      location: ''
    };

    setUser(user);

    AsyncStorage.removeItem('user');

    route.params?.handleScreen(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sistem Presensi</Text>

      <View style={styles.content}>
        <Image
          style={styles.image}
          source={icon}
        />
        <Text style={styles.text}>{ label }</Text>
      </View>

      {
        MoveToBottom(
          <SubmitButton title="KEMBALI" onPress={backToNature} size="sm" backgroundColor="#252525"/>
        )
      }

      {
        MoveToBottom(
          <SubmitButton title="PRESENSI" onPress={handleSubmit} size="sm" backgroundColor="#252525"/>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
    padding: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 25,
    color: '#fff',
  },
  title: {
    flex: 1,
    fontSize: 40,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  content: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    flex: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  appButtonContainer: {
    // elevation: 8,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: "#252525",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
})

export default Main;