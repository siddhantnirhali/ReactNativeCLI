import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HourlyForecastCard from '../components/HourlyForcastCard';
import DailyForecastCard from '../components/DailyForecastCard';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { useNavigation } from '@react-navigation/native';
import { getImageForCondition } from '../utils/getImagePath';

import { RootState } from './../store/store';

// ...existing code...

type ForecastScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Forecast'
>;
const { width, height } = Dimensions.get('window');
const ForecastScreen = () => {
  const navigation = useNavigation<ForecastScreenNavigationProp>();
  const forecast = useSelector((state: RootState) => state.weather.forecast);
  const city = useSelector((state: RootState) => state.weather.city);
  const hourlyForecast = forecast?.forecastday[0].hour;
  const dailyForecast = forecast?.forecastday || [];
  const imageSource = getImageForCondition(
    forecast?.forecastday[0].day.condition.text || 'Cloudy',
  );
  return (
    <SafeAreaView style={[styles.safeArea, { minHeight: height }]}> 
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.cityText}>{city}</Text>
          <Image source={imageSource} style={styles.image} resizeMode="contain" />
          <Text style={styles.tempText}>
            {forecast?.forecastday[0].day.avgtemp_c}°C
          </Text>
          <Text style={styles.conditionText}>
            {forecast?.forecastday[0].day.condition.text}
          </Text>
          <Text style={styles.infoText}>
            Humidity: {forecast?.forecastday[0].day.avghumidity}%
          </Text>
          <Text style={styles.infoText}>
            Wind: {forecast?.forecastday[0].day.maxwind_kph} kph
          </Text>
        </View>
        <View style={[styles.HourlyForecastContainer, { width: width * 0.95 }]}> 
          <Text style={styles.sectionTitle}>Hourly Forecast</Text>
          <FlatList
            data={hourlyForecast}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <HourlyForecastCard
                hour={item.time.split(' ')[1]}
                temperature={item.temp_c + '°C'}
                condition={item.condition.text}
                imageSource={getImageForCondition(item.condition.text)}
              />
            )}
          />
        </View>
        <View style={[styles.DailyForecastContainer, { width: width * 0.95, height: 0.42 * height }]}> 
          <FlatList
            data={dailyForecast}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <DailyForecastCard
                day={formatDateString(item.date)}
                temperature={item.day.avgtemp_c + '°C'}
                condition={item.day.condition.text}
                imageSource={getImageForCondition(item.day.condition.text)}
              />
            )}
            nestedScrollEnabled={true}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, { width: width * 0.5 }]}
          onPress={() => navigation.navigate('Weather')}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

function formatDateString(dateStr: string): string {
  const date = new Date(dateStr);

  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }); // e.g., "Tue"
  const day = date.getDate(); // e.g., 15

  return `${weekday} ${day}`;
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
    width: '100%',
  },
  // scrollContent removed, not needed
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  cityText: {
    fontSize: 0.055 * Dimensions.get('window').width,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  tempText: {
    fontSize: 0.045 * Dimensions.get('window').width,
    color: '#000',
    marginBottom: 4,
  },
  conditionText: {
    fontSize: 0.035 * Dimensions.get('window').width,
    color: '#000',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 0.03 * Dimensions.get('window').width,
    color: '#000',
    marginBottom: 4,
  },
  HourlyForecastContainer: {
    justifyContent: 'center',
    backgroundColor: '#1080d0ff',
    height: 0.28 * Dimensions.get('window').height,
    padding: 10,
    marginVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    gap: 15,
  },
  DailyForecastContainer: {
    padding: 10,
    marginVertical: 12,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a9becff',
    height: 0.42 * Dimensions.get('window').height,
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 0.035 * Dimensions.get('window').width,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  listContainer: {
    paddingHorizontal: 0,
    paddingVertical: 5,
    gap: 5,
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 14,
    borderRadius: 8,
    elevation: 2,
    margin: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 0.035 * Dimensions.get('window').width,
  },
  image: {
    width: 0.22 * Dimensions.get('window').width,
    height: 0.22 * Dimensions.get('window').width,
    marginBottom: 8,
  },
});
export default ForecastScreen;
