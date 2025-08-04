import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

type DailyForecastCardProps = {
  day: string;
  temperature: string;
  condition: string;
  imageSource: any;
};

const DailyForecastCard: React.FC<DailyForecastCardProps> = ({
  day,
  temperature,
  condition,
  imageSource,
}) => {
  return (
    <View style={styles.forcastCard}>
      <View style={styles.dailyForcastItem}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color:"#fff"}}>{day}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color:"#fff", textAlign:'center' }}>{condition}</Text>
      </View>
      <View style={styles.dailyForcastItem}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.dailyForcastItem}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' , color:"#fff"}}>{temperature}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  forcastCard: {
    flex: 1,
    flexDirection: 'row',
    //alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#59afedff',
    width: 300,
    height: 100,
    borderRadius: 10,
    padding: 0,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
    alignContent: 'space-around',
    borderColor: '#465865ff',
    borderWidth: 1,
  },
  dailyForcastItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'space-around',
    width: 100,
    height: 150,
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default DailyForecastCard;
