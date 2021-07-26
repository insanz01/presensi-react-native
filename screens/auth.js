import React, {useState, useEffect} from 'react';
import { StyleSheet, TextInput, View, ToastAndroid, Text, TouchableOpacity, AsyncStorage } from 'react-native';

import * as Device from 'expo-device';
import * as Application from 'expo-application';

// import DeviceInfo from 'react-native-device-info';

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

const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.LONG);
};

export default function Auth({handleScreen}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const authenticate = async (data) => {
    let postHeader = new Headers();

    // postHeader.append(
    //   'Authorization', 'Bearer [YOUR TOKEN HERE]'
    // );
    postHeader.append('Content-Type', 'application/json');

    try {
      const response =  await fetch('http://192.168.43.235/presensi-cerdas/api/login', {
        method: 'POST',
        headers: postHeader,
        body: JSON.stringify(data)
      });
  
      const json = await response.json();
      console.log(json.message)

      return true;
    } catch(error) {
      console.error(error);

      return false;
    }

  }

  const handleSubmit = async () => {
    if(username === "" || password === "") {
      // if username or password is empty
      showToast("Username atau Password tidak boleh kosong !");
    } else {
      if(username === password) {
        // if username and password didn't match
        showToast("Username dan Password tidak cocok !");
      } else {
        // DeviceInfo.getUniqueId().then((uniqueId) => setDeviceID(uniqueID));
        // DeviceInfo.getManufacturer().then((manufactur) => setManufacturer(manufactur));
        const manufacturer = Device.manufacturer;
        const deviceID = Application.androidId;

        const loginData = {
          username,
          password
        }

        if (await authenticate(loginData)) {
          const user = {
            deviceID,
            username,
            present: false,
            location: {},
            manufacturer
          };
  
          AsyncStorage.setItem('user', JSON.stringify(user));
          // console.log(user);
  
          handleScreen(true);
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>

      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholderTextColor="white"
        placeholder="Type your ID..."
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholderTextColor="white"
        placeholder="Type your password..."
        secureTextEntry={true}
      />

      {
        MoveToBottom(
          <SubmitButton title="Submit" onPress={handleSubmit} size="sm" backgroundColor="#007bff"/>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#252525',
  },
  title: {
    fontSize: 40,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#fff',
    color: '#fff',
    borderRadius: 10,
    fontSize: 18,
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

//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',