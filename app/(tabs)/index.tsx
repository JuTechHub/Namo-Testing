import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // For tab bar icons
import SignInScreen from "../../screens/signin.screen";
import InstalledAppsScreen from "../../screens/InstalledAppsScreen";

const Tab = createBottomTabNavigator();

export default function AppLayout() {
  return (
    <Tab.Navigator
      initialRouteName="SignIn"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Set icons based on the route name
          if (route.name === "SignIn") {
            iconName = focused ? "log-in" : "log-in-outline";
          } else if (route.name === "InstalledApps") {
            iconName = focused ? "apps" : "apps-outline";
          }

          // Return the appropriate icon
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF", // Active tab color
        tabBarInactiveTintColor: "gray", // Inactive tab color
      })}
    >
      <Tab.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "Sign In" }} // Custom title for the tab
      />
      <Tab.Screen
        name="InstalledApps"
        component={InstalledAppsScreen}
        options={{ title: "Installed Apps" }} // Custom title for the tab
      />
    </Tab.Navigator>
  );
}
