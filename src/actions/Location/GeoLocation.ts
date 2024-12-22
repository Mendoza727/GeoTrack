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

