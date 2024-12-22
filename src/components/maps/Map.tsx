import { Location } from '@/Interfaces/Location';
import React, { useRef } from 'react'
import { Platform } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { FAB } from '../ui/FAB';
import { useLocationStore } from '@/stores/location/useLocationStore';

interface Props {
    showUserLocation?: boolean;
    initialRegion: Location;
}

export const Map = ({ showUserLocation = true, initialRegion }: Props) => {
    const mapRef = useRef<MapView>();
    const cameraLocation = useRef<Location>(initialRegion);

    const { getLocation, lastknownLocation } = useLocationStore();

    const moveCamaraToLocation = (location: Location) => {
        if (!mapRef.current) return;

        mapRef.current.animateCamera({ center: location});
    }

    const moveToCurrentLocation = async () => {
        if (!lastknownLocation) {
            moveCamaraToLocation(initialRegion);
        }
        const location = await getLocation();
        if (!location) return;
        moveCamaraToLocation(location);
    };

    return (
        <>
            <MapView
                ref={(map) => mapRef.current = map!}
                provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{
                    flex: 1,
                }}
                showsUserLocation={showUserLocation}
                region={{
                    latitude: cameraLocation.current.latitude,
                    longitude: cameraLocation.current.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >

            </MapView>


            <FAB
                iconName='compass-outline'
                onPress={moveToCurrentLocation}
                style={{
                    bottom: 20,
                    right: 20
                }} />
        </>
    )
}
