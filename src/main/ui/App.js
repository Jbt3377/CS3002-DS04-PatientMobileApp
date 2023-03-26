import { NavigationContainer, StackActions } from "@react-navigation/native";

import DashboardScreen from "./src/screens/DashboardScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { Provider as PaperProvider } from "react-native-paper";
import ProfileScreen from "./src/screens/ProfileScreen";
import RegisterWoundScreen from "./src/screens/RegisterWoundScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import WoundCaptureScreen from "./src/screens/WoundCaptureScreen";
import WoundScreen from "./src/screens/WoundScreen";
import WoundSelectScreen from "./src/screens/WoundSelectScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("App executed");

  const theme = {
    roundness: 10,
  };

  return (
    <PaperProvider theme={theme}>
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
            options={{
              title: "WoundCaptureScreen",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="WoundSelectScreen"
            component={WoundSelectScreen}
            options={{ title: "Select Wound" }}
          />
          <Stack.Screen
            name="RegisterWoundScreen"
            component={RegisterWoundScreen}
            options={{ title: "Register Wound" }}
          />
          <Stack.Screen
            name="WoundScreen"
            component={WoundScreen}
            options={{ title: "Wound" }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ title: "Edit Profile" }}
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ title: "Settings" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
