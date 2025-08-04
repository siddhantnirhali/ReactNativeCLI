
import { Image, TouchableOpacity, View, Text, ActivityIndicator, StyleSheet, SafeAreaView, TextInput, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather } from '../weatherSlice';
import { RootState } from './../store/store';
import { RootStackParamList } from '../navigation/RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { getImageForCondition } from '../utils/getImagePath';
import { useState } from 'react';
import {AsyncStorage} from 'react-native';

const API_KEY = '8cbd6818499143c183c94125250805';
const CITY = 'pune';
const DAYS = '10';

type WeatherScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Weather'>; 

const WeatherScreen = () => {
  const navigation = useNavigation<WeatherScreenNavigationProp>();
  const dispatch = useDispatch();
  const { city, forecast, loading, error } = useSelector((state: RootState) => state.weather);
  const [cityname, setCityname] = useState(city);
  


    // Function to fetch weather data based on user input
    const fetchWeatherData = (cityName: string) => {
      console.log('Data successfully saved');
    if (!cityName) {
      Alert.alert('Validation', 'Please enter a city name');
      return;
    }
    _retriveCachedData(cityName).then((cached) => {
      if (cached) {
        Alert.alert('Validation', 'We have the data');
      } else {
        Alert.alert('Validation', 'We do not have the data');
        dispatch(fetchWeather({ apiKey: API_KEY, city: cityName, days: DAYS }) as any);
      }
    });
    
}

const _retriveCachedData = async (cityName: string): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(cityName);
    if (value !== null) {
      // We have data!!
      Alert.alert('Validation', 'We have the data');
      console.log(value);
      return true;
    }
    return false;
  } catch (error) {
    // Error retrieving data
    return false;
  }
};

const imageSource = getImageForCondition(forecast?.forecastday[0].day.condition.text || 'Cloudy');
  
 
  let content;
  if (loading) {
    content = <ActivityIndicator size="large" color="#2196f3" />;
  } else if (error) {
    content = <Text style={styles.error}>{error}</Text>;
  } else if (city && forecast !== null) {
    content = (
      <View>
<View style={styles.weatherBox}>
        
        <Text style={styles.city}>{city}</Text>
        <Image
        source={imageSource}
        style={styles.image}
        resizeMode="contain"
      />
        <Text style={styles.temp}>{forecast.forecastday[0].day.avgtemp_c}°C</Text>
        
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Forecast')}>
            <Text style={styles.buttonText}>Next Forecast</Text>
          </TouchableOpacity>
      </View>
      
    );
  } else {
    content = null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Weather App</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={cityname}
          onChangeText={setCityname}
          testID='cityInput'
          />
          <TouchableOpacity style={styles.button} onPress={() => fetchWeatherData(cityname)} testID='fetchWeatherButton'>
            <Text style={styles.buttonText}>Get Weather</Text>
          </TouchableOpacity>
  
        {content}
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1565c0',
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
 
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#bdbdbd',
    borderRadius: 8,
  },
   button: {
    backgroundColor: '#6200EE',
    padding: 12,
    alignItems: 'center',
    //width: 200,
    margin: 10,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  weatherBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 24,
    width: 250,
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  city: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1976d2',
  },
  temp: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WeatherScreen;


