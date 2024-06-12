import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

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
      console.log(userLocation);
      setLocation(userLocation);
    }

    getPosition();
  }, []);

  return (
    <View style={styles.container}>

      {location ? <Text>Latitude: {location.coords.latitude} Longitude: {location.coords.longitude}</Text> : <Text>Carregando...</Text>}

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
});
