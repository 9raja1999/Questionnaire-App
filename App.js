import React from 'react';
import {
  NavigationContainer
} from '@react-navigation/native'
import {
  createNativeStackNavigator
} from "@react-navigation/native-stack"
import {
  ToastProvider
} from 'react-native-paper-toast'
import {
  SafeAreaProvider,
  initialWindowMetrics
} from 'react-native-safe-area-context'
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme
} from 'react-native-paper'

import Home from './src/screens/home/Home';
import Info from './src/screens/user-info/Info';
import Questionere from './src/screens/questionere/Questionere';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={DefaultTheme}>
        <ToastProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name='Home'
                component={Home}
              />
              <Stack.Screen
                name='info'
                component={Info}
              />
              <Stack.Screen
                name='questionere'
                component={Questionere}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ToastProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
