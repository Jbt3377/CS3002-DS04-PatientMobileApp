import { NavigationContainer, StackActions } from "@react-navigation/native";

import DashboardScreen from "./src/screens/DashboardScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { Provider as PaperProvider } from "react-native-paper";
import ProfileScreen from "./src/screens/ProfileScreen";
import RegisterWoundScreen from "./src/screens/RegisterWoundScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import WoundCaptureScreen from "./src/screens/WoundCaptureScreen";
import WoundSelectScreen from "./src/screens/WoundSelectScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("App executed");
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              title: "LoginScreen",
              headerShown: false,
            }}
          />
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
          <Stack.Screen
            name="WoundSelectScreen"
            component={WoundSelectScreen}
            options={{
              title: "WoundSelectScreen",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RegisterWoundScreen"
            component={RegisterWoundScreen}
            options={{ title: "RegisterWoundScreen" }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ title: "ProfileScreen" }}
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ title: "SettingsScreen" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
