import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/Auth/Login';
import About from '../screens/Auth/About';
import VerifyOTP from '../screens/Auth/VerifyOTP';
import {navigationRef} from './RootNavigator';

const Stack = createNativeStackNavigator();
const Index = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
