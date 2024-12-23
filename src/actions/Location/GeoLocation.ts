import { Location } from '@/Interfaces/Location';
import * as ExpoLocation from 'expo-location';

export const getCurrentLocation = async (): Promise<Location> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return reject(new Error('Permiso denegado para acceder a la ubicación.'));
            }

            const location = await ExpoLocation.getCurrentPositionAsync({
                accuracy: ExpoLocation.Accuracy.Highest
            });

            resolve({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        } catch (error) {
            reject(error);
        }
    });
};

export const watchCurrentLocation = async (callback: (location: Location) => void): Promise<ExpoLocation.LocationSubscription | null> => {
    try {
        const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('Permiso denegado para acceder a la ubicación.');
        }

        const subscription = await ExpoLocation.watchPositionAsync(
            {
                accuracy: ExpoLocation.Accuracy.High, // Alta precisión
                timeInterval: 1000, // Intervalo de tiempo en milisegundos
                distanceInterval: 1, // Distancia en metros para actualizaciones
            },
            (location) => {
                callback({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            }
        );

        return subscription; // Devuelve la suscripción
    } catch (error) {
        console.error('Error al iniciar el seguimiento de la ubicación:', error);
        return null; // Retorna null si falla
    }
};

export const clearWatchCurrentLocation = (subscription: ExpoLocation.LocationSubscription | null) => {
    if (subscription && typeof subscription.remove === 'function') {
        subscription.remove();
    }
};
