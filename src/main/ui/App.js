import { NavigationContainer, StackActions } from "@react-navigation/native";

import DashboardScreen from "./src/screens/DashboardScreen";
import WoundCaptureScreen from "./src/screens/WoundCaptureScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("App executed");
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: "Dashboard" }}
        />
        <Stack.Screen
          name="WoundCaptureScreen"
          component={WoundCaptureScreen}
          options={{ title: "WoundCaptureScreen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
