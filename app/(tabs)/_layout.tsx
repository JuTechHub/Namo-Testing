import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignInScreen from "../../screens/LoginScreen";

const Tab = createBottomTabNavigator();

export default function AppLayout() {
  return (
    <Tab.Navigator initialRouteName="SignIn">
      <Tab.Screen name="SignIn" component={SignInScreen} />

      {/* <Tab.Screen name="LoggedInScreen" component={LoggedInScreen} /> */}
    </Tab.Navigator>
  );
}
