import React, {useState, useEffect} from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { SafeAreaView, StyleSheet, AsyncStorage } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// screens
import Auth from './screens/auth';
import Main from './screens/main';

// shared
import Scanner from './shared/scanner';

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
});

const Stack = createStackNavigator();

const AppStackScreen = ({scanned, hasPermission, handleScreen}) => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Scanner" component={Scanner} initialParams={{ scanned, hasPermission }}/>
      <Stack.Screen name="Main" component={Main} options={{headerShown: false}} initialParams={{handleScreen}}/>
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState('wait');
  const [isLogin, setLogin] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {

    if(!isLogin) {
      AsyncStorage.getItem('user', (error, result) => {
        if(result) {
          console.log('isi datanya', result);
          setLogin(true);
        } else {
          console.log('pesan error:', error);
        }
      });
    }
  }, [isLogin]);

  const handleScreen = (status) => {
    console.log('hasil login', status);
    setLogin(status);
  }
  
  const ScreenView = () => (!isLogin) ? <Auth handleScreen={handleScreen}/> : (
    <NavigationContainer>
      {/* <Main handleScreen={handleScreen}/> */}
      <AppStackScreen handleScreen={handleScreen} scanned={scanned} hasPermission={hasPermission} />
    </NavigationContainer>
  )

  if(fontsLoaded === 'done') {
    return (
      // <NavigationContainer>
        <SafeAreaView style={styles.container}>
          {/* <AppStackScreen/> */}
          <ScreenView/>
        </SafeAreaView>
      // </NavigationContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded('done')}
        onError={console.warn}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
