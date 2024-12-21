import * as Location from 'expo-location';
import { PermissionStatus } from "@/Interfaces/Permissions";
import { Platform, Linking } from "react-native";

export const requestLocationPermission = async (): Promise<PermissionStatus> => {
    let status = 'undetermined' as Location.PermissionStatus;

    // Solicitar permisos de ubicación
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
        const { status: permissionStatus } = await Location.requestForegroundPermissionsAsync();
        status = permissionStatus;
    } else {    
        throw new Error('Platform not supported');
    }

    if (status === 'denied') {
        // Si el permiso es denegado, puedes abrir la configuración del sistema para permitir que el usuario lo habilite
        await openAppSettings();
        return await checkLocationPermission();
    }

    const permissionMapper: Record<Location.PermissionStatus, PermissionStatus> = {
        granted: 'granted',
        denied: 'denied',
        undetermined: 'undetermined',
    };

    return permissionMapper[status] ?? 'undetermined';
};

export const checkLocationPermission = async (): Promise<PermissionStatus> => {
    let status = 'undetermined' as Location.PermissionStatus;

    // Verificar permisos de ubicación
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
        const { status: permissionStatus } = await Location.getForegroundPermissionsAsync();
        status = permissionStatus;
    } else {
        throw new Error('Platform not supported');
    }

    const permissionMapper: Record<Location.PermissionStatus, PermissionStatus> = {
        granted: 'granted',
        denied: 'denied',
        undetermined: 'undetermined',
    };

    return permissionMapper[status] ?? 'undetermined';
};

// Función para abrir la configuración de la app
export const openAppSettings = async () => {
    const url = Platform.select({
        ios: 'app-settings:',
        android: 'package:com.geotrack.app',
    });
    await Linking.openURL(url as any);
};
