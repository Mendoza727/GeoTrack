import { Map } from '@/components/maps/Map';
import { useLocationStore } from '@/stores/location/useLocationStore';
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import LoadingScreen from '../loading/LoadingScreen';

export const MapScreen = () => {
  const { getLocation, lastknownLocation } = useLocationStore();

  useEffect(() => {
    if ( lastknownLocation === null ) {
      getLocation();
    }
  }, []);

  if ( lastknownLocation === null ) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Map  
        initialRegion={ lastknownLocation }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  }
});
