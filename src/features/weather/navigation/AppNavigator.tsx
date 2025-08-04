import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeatherScreen from '../screens/WeatherScreen';
import { RootStackParamList } from './RootStackParamList';
import ForecastScreen from '../screens/ForecastScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Weather' screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen name="Forecast" component={ForecastScreen} />
      
    </Stack.Navigator>
  );
};

export default AppNavigator;
