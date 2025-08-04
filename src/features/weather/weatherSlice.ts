import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherResponse } from './api/Weather';
import { Forecast } from './api/Weather';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WeatherState {
  city: string;
  forecast: Forecast | null;
  loading: boolean;
  error: string;
}

const initialState: WeatherState = {
  city: '',
  forecast: null,
  loading: false,
  error: '',
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ apiKey, city, days }: { apiKey: string; city: string; days: string }) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}`;
    const response = await fetch(url);
    const data: WeatherResponse = await response.json();
    if (data?.location?.name && data?.current?.temp_c !== undefined) {
      // Store data in AsyncStorage
      await _storeData(data.location.name, data.forecast);
      return {
        city: data.location.name,
        forecast: data.forecast
      };
    } else {
      throw new Error('Failed to fetch weather data');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload.city;
        state.forecast = action.payload.forecast;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching weather';
      });
  },
});

const _storeData = async (city: string, forecast: Forecast) => {
  try {
    await AsyncStorage.setItem(
      city,
      JSON.stringify(forecast),
    );
    console.log('Data successfully saved');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export default weatherSlice.reducer;
