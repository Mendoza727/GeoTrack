import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen } from '@/screens/maps/MapScreen';
import { PermissionScreen } from '@/screens/permissions/PermissionScreen';
import LoadingScreen from '@/screens/loading/LoadingScreen';

export type RootStackParams = {
  Loading: undefined;
  Maps: undefined;
  Permissions: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Loading'
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}>
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Maps" component={MapScreen} />
      <Stack.Screen name="Permissions" component={PermissionScreen} />
    </Stack.Navigator>
  );
}