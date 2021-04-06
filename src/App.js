import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screen/HomeScreen';
import ImageScreen from './screen/ImageScreen';
import {StatusBar} from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#000000" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: null,
          }}
        />
        <Stack.Screen
          name="Image"
          component={ImageScreen}
          options={{
            headerShown: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
