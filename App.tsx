import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import PDFView from './PDFView';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          options={{
            animation: 'slide_from_right',
            gestureEnabled: true,
          }}
          name="PDFView"
          component={PDFView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
