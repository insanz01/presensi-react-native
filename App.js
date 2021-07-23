import React, {useState} from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// screens
import Auth from './screens/auth';
import Main from './screens/main';

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
});

const Stack = createStackNavigator();

const AppStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}}/>
      <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState('wait');

  if(fontsLoaded === 'done') {
    return (
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <AppStackScreen/>
        </SafeAreaView>
      </NavigationContainer>
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
