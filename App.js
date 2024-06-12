import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import userMarker from './assets/like.png';

import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // solicitar se temos acesso ao GPS (Promise)
    async function getPosition() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.log('Não temos permissão para acessar o GPS');
        return;
      }

      // pegar a posição atual
      const userLocation = await Location.getCurrentPositionAsync({});
      
      // aqui ja temos a localização do usuário
      setLocation(userLocation);
    }

    getPosition();
  }, []);

  // location.coords.latitude
  // location.coords.longitude

  return (
    <View style={styles.container}>
      {location && (
        <MapView 
          style={styles.map} 
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker 
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }} 
            title='O mozão está aqui!'
            image={userMarker}
          />
        </MapView>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
