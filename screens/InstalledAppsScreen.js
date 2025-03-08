import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { InstalledApps, RNLauncherKitHelper } from "react-native-launcher-kit";

const InstalledAppsScreen = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch installed apps
  const fetchInstalledApps = async () => {
    try {
      const appsList = await InstalledApps.getApps({
        includeVersion: true,
        includeAccentColor: true,
      });
      setApps(appsList);
    } catch (error) {
      console.error("Failed to fetch installed apps:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstalledApps();
  }, []);

  // Launch an app when tapped
  const launchApp = (packageName) => {
    RNLauncherKitHelper.launchApplication(packageName)
      .then(() => console.log(`Launched app: ${packageName}`))
      .catch((error) =>
        console.error(`Failed to launch app: ${packageName}`, error)
      );
  };

  // Render each app item
  const renderApp = ({ item }) => (
    <TouchableOpacity
      style={styles.appItem}
      onPress={() => launchApp(item.packageName)}
    >
      <Image source={{ uri: item.icon }} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{item.label}</Text>
        {item.version && (
          <Text style={styles.version}>Version: {item.version}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  // Loading state
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Apps...</Text>
      </View>
    );
  }

  // Empty state
  if (apps.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No installed apps found.</Text>
      </View>
    );
  }

  // Render the list of apps
  return (
    <FlatList
      data={apps}
      keyExtractor={(item) => item.packageName}
      renderItem={renderApp}
      contentContainerStyle={styles.container}
    />
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  appItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  version: {
    fontSize: 14,
    color: "#666",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InstalledAppsScreen;
