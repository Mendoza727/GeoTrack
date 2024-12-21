import { RootStackParams } from "@/navigations/StackNavigator";
import { usePermissionStore } from "@/stores/permissions/usePermissionsStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PropsWithChildren, useEffect } from "react";
import { AppState } from "react-native";

export const PermissionChecker = ({ children }: PropsWithChildren) => {

    const { locationStatus, checkLocationPermission } = usePermissionStore();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    useEffect(() => {
        if (locationStatus === 'granted') {
            navigation.reset({
                routes: [{ name: 'Maps' }]
            })
        } else if (locationStatus !== 'undetermined') {
            navigation.reset({
                routes: [{ name: 'Permissions' }]
            })
        }
    }, [locationStatus]);

    useEffect(() => {
        checkLocationPermission();
    }, []);

    useEffect(() => {
        const suscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                checkLocationPermission();
            }
        });

        return () => {
            suscription.remove();
        }
    }, []);

    return (
        <>{ children }</>
    )
}