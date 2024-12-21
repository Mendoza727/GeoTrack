import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from '@/navigations/StackNavigator';
import { PermissionChecker } from '@/providers/PermissionChecker';

export default function App() {
  return (
    <NavigationContainer>
      <PermissionChecker>
        <StackNavigator />
      </PermissionChecker>
    </NavigationContainer>
  );
}
