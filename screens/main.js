import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

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

const Main = () => {
  const [isPresent, doPresent] = useState(false);
  const [label, setLabel] = useState('Kamu Belum Presensi');

  let icon = !isPresent ?
              require('../assets/main/before.png') :
              require('../assets/main/after.png');

  const handleSubmit = () => {
    if(isPresent) {
      doPresent(false);
      setLabel('Kamu Belum Presensi');
    } else {
      doPresent(true);
      setLabel('Kamu Sudah Hadir');
    }
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
          // <Button onPress={() => console.log('halo')} title="Submit" />
          <SubmitButton title="PRESENSI" onPress={handleSubmit} size="sm" backgroundColor="#007bff"/>
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