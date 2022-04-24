import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import { initializeApp } from "firebase/app";
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Provider } from 'react-redux';
import { store } from "./redux/reducers/store";

const firebaseConfig = {
  apiKey: "AIzaSyBy_nJLEoiCDKqQVUDItMr4lHb5e0wBdJ0",
  authDomain: "memechat-561fb.firebaseapp.com",
  projectId: "memechat-561fb",
  storageBucket: "memechat-561fb.appspot.com",
  messagingSenderId: "1096892942609",
  appId: "1:1096892942609:web:0133272ff5daff83d864b0",
  measurementId: "G-C0J4F9FYKL"
};

const app = initializeApp(firebaseConfig)
const Stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const auth = getAuth(app)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setLoggedIn(true);
      setLoaded(true)
    } else {
      setLoggedIn(false);
      setLoaded(true);
    }
  });

  if(!loaded){
    return(
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Loading</Text>
      </View>
    )
  }

  if(!loggedIn){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} app={app}/>
          <Stack.Screen name="Login" component={LoginScreen} app={app}/>
        </Stack.Navigator>
      </NavigationContainer>
  
    );
  }

    return(
      <Provider store={store}>
      <MainScreen />
      </Provider>
    )
  }


