import React, {useState, useEffect} from 'react';
import { StyleSheet, TextInput, View, ToastAndroid, Text, TouchableOpacity, AsyncStorage } from 'react-native';

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

export default function Auth({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if(username === "" || password === "") {
      // if username or password is empty
      showToast("Username atau Password tidak boleh kosong !");
    } else {
      if(username !== password) {
        // if username and password didn't match
        showToast("Username dan Password tidak cocok !");
      } else {
        const user = {
          username,
          present: false,
          location: false
        };

        AsyncStorage.setItem('user', JSON.stringify(user));
        console.log(user);

        navigation.navigate('Main');
      }
    }
  }

  useEffect(() => {
    console.log('Do something from auth!');
    
    //username, present, location
    AsyncStorage.getItem('user', (error, result) => {
      if(result) {
        console.log('Nah jalan');
        console.log(result);
        navigation.navigate('Main');
      } else {
        console.log(error);
      }
    });

  }, []);

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