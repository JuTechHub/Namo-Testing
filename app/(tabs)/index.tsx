// "use client";

// import { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   FlatList,
//   Alert,
//   Platform,
//   StatusBar,
// } from "react-native";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import * as Linking from "expo-linking";
// import { Ionicons } from "@expo/vector-icons";

// // Sample app data since we can't directly use react-native-launcher-kit in Expo without custom dev client
// const SAMPLE_APPS = [
//   {
//     id: "1",
//     appName: "Chrome",
//     packageName: "com.android.chrome",
//     icon: "logo-chrome",
//   },
//   {
//     id: "2",
//     appName: "Gmail",
//     packageName: "com.google.android.gm",
//     icon: "mail",
//   },
//   {
//     id: "3",
//     appName: "Maps",
//     packageName: "com.google.android.apps.maps",
//     icon: "map",
//   },
//   {
//     id: "4",
//     appName: "YouTube",
//     packageName: "com.google.android.youtube",
//     icon: "logo-youtube",
//   },
//   {
//     id: "5",
//     appName: "Calendar",
//     packageName: "com.google.android.calendar",
//     icon: "calendar",
//   },
//   {
//     id: "6",
//     appName: "Photos",
//     packageName: "com.google.android.apps.photos",
//     icon: "images",
//   },
//   {
//     id: "7",
//     appName: "Drive",
//     packageName: "com.google.android.apps.docs",
//     icon: "cloud",
//   },
//   {
//     id: "8",
//     appName: "Play Store",
//     packageName: "com.android.vending",
//     icon: "logo-google-playstore",
//   },
//   {
//     id: "9",
//     appName: "Settings",
//     packageName: "com.android.settings",
//     icon: "settings",
//   },
//   {
//     id: "10",
//     appName: "WhatsApp",
//     packageName: "com.whatsapp",
//     icon: "logo-whatsapp",
//   },
//   {
//     id: "11",
//     appName: "Instagram",
//     packageName: "com.instagram.android",
//     icon: "logo-instagram",
//   },
//   {
//     id: "12",
//     appName: "Facebook",
//     packageName: "com.facebook.katana",
//     icon: "logo-facebook",
//   },
// ];

// export default function TabsIndex() {
//   const [installedApps, setInstalledApps] = useState(SAMPLE_APPS);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (Platform.OS !== "android") {
//       Alert.alert(
//         "Platform not supported",
//         "App launching is primarily designed for Android devices"
//       );
//     }
//   }, []);

//   const launchApp = async (packageName) => {
//     try {
//       if (Platform.OS === "android") {
//         // On Android, we can try to launch apps using intent URLs
//         const supported = await Linking.canOpenURL(
//           `android-app://${packageName}`
//         );

//         if (supported) {
//           await Linking.openURL(`android-app://${packageName}`);
//         } else {
//           // Fallback to market URL if app is not installed
//           await Linking.openURL(`market://details?id=${packageName}`);
//         }
//       } else {
//         Alert.alert(
//           "iOS Limitation",
//           "On iOS, apps can only be opened if they have registered URL schemes and your app has been configured to use them."
//         );
//       }
//     } catch (error) {
//       console.error("Error launching app:", error);
//       Alert.alert("Error", "Failed to launch app");
//     }
//   };

//   const renderAppItem = ({ item }) => {
//     return (
//       <TouchableOpacity
//         style={styles.appItem}
//         onPress={() => launchApp(item.packageName)}
//       >
//         <View style={styles.appIconContainer}>
//           <Ionicons name={item.icon} size={24} color="#4f46e5" />
//         </View>
//         <View style={styles.appInfo}>
//           <Text style={styles.appName}>{item.appName}</Text>
//           <Text style={styles.packageName}>{item.packageName}</Text>
//         </View>
//         <Ionicons name="open-outline" size={20} color="#666" />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="light-content" backgroundColor="#4f46e5" />

//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>App Launcher</Text>
//           <Text style={styles.headerSubtitle}>Tap on an app to launch it</Text>
//         </View>

//         <View style={styles.infoBox}>
//           <Text style={styles.infoText}>
//             Note: This is a demonstration using Expo. For full functionality
//             with real app listing, you would need to use a custom Expo
//             development build with the react-native-launcher-kit native module.
//           </Text>
//         </View>

//         {loading ? (
//           <View style={styles.loadingContainer}>
//             <Text style={styles.loadingText}>Loading apps...</Text>
//           </View>
//         ) : (
//           <FlatList
//             data={installedApps}
//             renderItem={renderAppItem}
//             keyExtractor={(item) => item.id}
//             contentContainerStyle={styles.listContainer}
//           />
//         )}
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   header: {
//     padding: 16,
//     backgroundColor: "#4f46e5",
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: "rgba(255, 255, 255, 0.8)",
//     marginTop: 4,
//   },
//   infoBox: {
//     margin: 16,
//     padding: 12,
//     backgroundColor: "#e0f2fe",
//     borderRadius: 8,
//     borderLeftWidth: 4,
//     borderLeftColor: "#0ea5e9",
//   },
//   infoText: {
//     fontSize: 14,
//     color: "#0c4a6e",
//     lineHeight: 20,
//   },
//   listContainer: {
//     padding: 16,
//   },
//   appItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "white",
//     borderRadius: 12,
//     marginBottom: 12,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//   },
//   appIconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 12,
//     backgroundColor: "#f1f5f9",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   appInfo: {
//     marginLeft: 16,
//     flex: 1,
//   },
//   appName: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//   },
//   packageName: {
//     fontSize: 12,
//     color: "#666",
//     marginTop: 4,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingText: {
//     fontSize: 16,
//     color: "#666",
//   },
// });


//---- After  applying react native launcher kit


"use client";

import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";
import LauncherKit from "react-native-launcher-kit";

// Sample app data since we can't directly use react-native-launcher-kit in Expo without custom dev client
const SAMPLE_APPS = [
  {
    id: "1",
    appName: "Chrome",
    packageName: "com.android.chrome",
    icon: "logo-chrome",
  },
  {
    id: "2",
    appName: "Gmail",
    packageName: "com.google.android.gm",
    icon: "mail",
  },
  {
    id: "3",
    appName: "Maps",
    packageName: "com.google.android.apps.maps",
    icon: "map",
  },
  {
    id: "4",
    appName: "YouTube",
    packageName: "com.google.android.youtube",
    icon: "logo-youtube",
  },
  {
    id: "5",
    appName: "Calendar",
    packageName: "com.google.android.calendar",
    icon: "calendar",
  },
  {
    id: "6",
    appName: "Photos",
    packageName: "com.google.android.apps.photos",
    icon: "images",
  },
  {
    id: "7",
    appName: "Drive",
    packageName: "com.google.android.apps.docs",
    icon: "cloud",
  },
  {
    id: "8",
    appName: "Play Store",
    packageName: "com.android.vending",
    icon: "logo-google-playstore",
  },
  {
    id: "9",
    appName: "Settings",
    packageName: "com.android.settings",
    icon: "settings",
  },
  {
    id: "10",
    appName: "WhatsApp",
    packageName: "com.whatsapp",
    icon: "logo-whatsapp",
  },
  {
    id: "11",
    appName: "Instagram",
    packageName: "com.instagram.android",
    icon: "logo-instagram",
  },
  {
    id: "12",
    appName: "Facebook",
    packageName: "com.facebook.katana",
    icon: "logo-facebook",
  },
];

export default function TabsIndex() {
  const [installedApps, setInstalledApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Platform.OS === "android") {
      fetchInstalledApps();
    } else {
      setLoading(false);
      Alert.alert(
        "Platform not supported",
        "App listing is only available on Android devices"
      );
    }
  }, []);

  const fetchInstalledApps = async () => {
    try {
      // Now we can use the actual LauncherKit API
      const apps = await LauncherKit.getApps();
      setInstalledApps(apps.slice(0, 20)); // Limit to first 20 apps
      setLoading(false);
    } catch (error) {
      console.error("Error fetching apps:", error);
      setLoading(false);
      Alert.alert("Error", "Failed to fetch installed apps");
    }
  };

  const launchApp = async (packageName) => {
    try {
      if (Platform.OS === "android") {
        // On Android, we can try to launch apps using intent URLs
        const supported = await Linking.canOpenURL(
          `android-app://${packageName}`
        );

        if (supported) {
          await Linking.openURL(`android-app://${packageName}`);
        } else {
          // Fallback to market URL if app is not installed
          await Linking.openURL(`market://details?id=${packageName}`);
        }
      } else {
        Alert.alert(
          "iOS Limitation",
          "On iOS, apps can only be opened if they have registered URL schemes and your app has been configured to use them."
        );
      }
    } catch (error) {
      console.error("Error launching app:", error);
      Alert.alert("Error", "Failed to launch app");
    }
  };

  const renderAppItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.appItem}
        onPress={() => launchApp(item.packageName)}
      >
        <View style={styles.appIconContainer}>
          <Ionicons name={item.icon} size={24} color="#4f46e5" />
        </View>
        <View style={styles.appInfo}>
          <Text style={styles.appName}>{item.appName}</Text>
          <Text style={styles.packageName}>{item.packageName}</Text>
        </View>
        <Ionicons name="open-outline" size={20} color="#666" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#4f46e5" />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>App Launcher</Text>
          <Text style={styles.headerSubtitle}>Tap on an app to launch it</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Note: This is a demonstration using Expo. For full functionality
            with real app listing, you would need to use a custom Expo
            development build with the react-native-launcher-kit native module.
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading apps...</Text>
          </View>
        ) : (
          <FlatList
            data={installedApps}
            renderItem={renderAppItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "#4f46e5",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  infoBox: {
    margin: 16,
    padding: 12,
    backgroundColor: "#e0f2fe",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#0ea5e9",
  },
  infoText: {
    fontSize: 14,
    color: "#0c4a6e",
    lineHeight: 20,
  },
  listContainer: {
    padding: 16,
  },
  appItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  appIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },
  appInfo: {
    marginLeft: 16,
    flex: 1,
  },
  appName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  packageName: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
});
