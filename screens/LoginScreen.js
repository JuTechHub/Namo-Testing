// import React, { useEffect } from "react";
// import { StyleSheet, TouchableOpacity, Text } from "react-native";
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { useNavigation } from "@react-navigation/native";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// // Configure Google Sign-In
// GoogleSignin.configure({
//   webClientId:
//     "519509228652-47nav12d3qe6cf8012eui1krem0au0ju.apps.googleusercontent.com",
// });

// export default function LoginScreen() {
//   const navigation = useNavigation();

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       console.log("User signed in:", user);

//       // Navigate to the logged-in page
//       navigation.navigate("LoggedIn");
//     } catch (error) {
//       console.error("Error signing in with Google:", error);
//     }
//   };

//   return (
//     <ThemedView style={styles.container}>
//       <ThemedText type="title" style={styles.title}>
//         Welcome Back!
//       </ThemedText>
//       <ThemedText type="subtitle" style={styles.subtitle}>
//         Sign in to continue
//       </ThemedText>
//       <TouchableOpacity
//         style={styles.googleButton}
//         onPress={handleGoogleSignIn}
//       >
//         <Text style={styles.googleButtonText}>Sign in with Google</Text>
//                     </TouchableOpacity>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 8,
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 24,
//   },
//   googleButton: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#4285F4",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   googleButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginScreen() {
  const navigation = useNavigation();

  // Initialize Google SignIn
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "519509228652-47nav12d3qe6cf8012eui1krem0au0ju.apps.googleusercontent.com",
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      // Attempt to sign in with Google
      console.log("Signing in with Google...");
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = userInfo;

      // Create a Google credential with the idToken
      const credential = GoogleAuthProvider.credential(idToken);

      // Sign in with Firebase using the Google credential
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;
      console.log("User signed in:", user);

      // Navigate to the logged-in page
      navigation.navigate("LoggedIn");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
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
      >
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
        
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
  },
  googleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
