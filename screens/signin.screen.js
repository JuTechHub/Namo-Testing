import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  ActivityIndicator,
} from "react-native";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJw5kdlMzKXrWJPRJeEIuaR5qe4psH8JU",
  authDomain: "namo-launcher.firebaseapp.com",
  projectId: "namo-launcher",
  storageBucket: "namo-launcher.appspot.com",
  messagingSenderId: "519509228652",
  appId: "1:519509228652:android:7311a955ddd74b89c4ac49",
};

// Initialize Firebase with persistence
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "519509228652-hilm8dhikp8l84gr3s8omdgbkocb7ol2.apps.googleusercontent.com", // Replace with your client ID
  });

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      if (Platform.OS === "web") {
        // Web-specific sign-in
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        handleSignInSuccess(result.user);
      } else {
        // Mobile sign-in
        await promptAsync();
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      Alert.alert("Error", "Failed to sign in. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => handleSignInSuccess(userCredential.user))
        .catch((error) => {
          console.error("Credential error:", error);
          Alert.alert("Error", "Failed to sign in. Please try again.");
          setLoading(false);
        });
    }
  }, [response]);

  const handleSignInSuccess = (user : any) => {
    console.log("Signed in user:", user);
    navigation.navigate("LoggedIn");
    setLoading(false);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Welcome Back!
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Sign in to continue
      </ThemedText>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
        disabled={loading || !request}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        )}
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  googleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4285F4",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 200,
  },
  googleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
