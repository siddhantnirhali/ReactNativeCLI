import React from "react";
import {Image, View, Text, StyleSheet} from "react-native";

type HourlyForecastCardProps = {
  hour: string;
  temperature: string;
    condition: string;
    imageSource: any; // Adjust type as needed, e.g., ImageSourcePropType
}

const HourlyForecastCard: React.FC<HourlyForecastCardProps> = ({ hour, temperature, condition, imageSource }) => {
  
  return (
    <View style={styles.forcastCard}>
        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', alignContent: 'space-around'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{hour}</Text>
            <Text style={{fontSize: 14}}>{temperature}</Text>
            <Image
                    source={imageSource}
                    style={styles.image}
                    resizeMode="contain"
                  />
            <Text style={{fontSize: 12, color: '#000000ff', textAlign:'center'}}>{condition}</Text>
        </View>
        </View>
  );
}
const styles = StyleSheet.create({
  forcastCard: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 150,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: 40,
    height: 40,
  },

});

export default HourlyForecastCard;