import { Location } from '@/Interfaces/Location';
import React, { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import { FAB } from '../ui/FAB';
import { useLocationStore } from '@/stores/location/useLocationStore';

interface Props {
    showUserLocation?: boolean;
    initialRegion: Location;
}

export const Map = ({ showUserLocation = true, initialRegion }: Props) => {
    const mapRef = useRef<MapView>();
    const cameraLocation = useRef<Location>(initialRegion);
    const [isFollowingUser, setIsFollowingUser] = useState(true);
    const [isShowingPolyline, setIsShowingPolyline] = useState(true);

    const { getLocation, lastknownLocation, whatchLocation, clearLocationWatch, userLocationHistory } = useLocationStore();

    const moveCamaraToLocation = (location: Location) => {
        if (!mapRef.current) return;

        mapRef.current.animateCamera({ center: location });
    }

    const moveToCurrentLocation = async () => {
        if (!lastknownLocation) {
            moveCamaraToLocation(initialRegion);
        }
        const location = await getLocation();
        if (!location) return;
        moveCamaraToLocation(location);
    };


    useEffect(() => {
        whatchLocation();

        return () => {
            clearLocationWatch();
        }
    }, []);


    useEffect(() => {
        if (lastknownLocation && isFollowingUser) {
            moveCamaraToLocation(lastknownLocation);
        }
    }, [lastknownLocation, isFollowingUser]);

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
                onTouchStart={() => setIsFollowingUser(false)}
            >
                {
                    isShowingPolyline && (
                        <Polyline
                            coordinates={userLocationHistory}
                            strokeColor="#000"
                            strokeWidth={3}
                        />
                    )
                }
            </MapView>

            <FAB
                iconName={isShowingPolyline ? 'eye-outline' : 'eye-off-outline'}
                onPress={() => setIsShowingPolyline(!isShowingPolyline)}
                style={{
                    bottom: 150,
                    right: 20
                }} />

            <FAB
                iconName={isFollowingUser ? 'walk-outline' : 'accessibility-outline'}
                onPress={() => setIsFollowingUser(!isFollowingUser)}
                style={{
                    bottom: 85,
                    right: 20
                }} />


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
