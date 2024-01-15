import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(null);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(null);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if (!username || !password) {
      setError("Masukkan username dan password!");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    setLoading(true);
    const data = {
      username: username,
      password: password,
    };
    axios
      .post("https://server-smartpatrol.vercel.app/api/v1/auth/", data)
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          AsyncStorage.setItem("username", username);
          AsyncStorage.setItem("userId", response.data.userId);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
          navigation.navigate("BottomTabBar");
        }
      })

      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 400) {
            setError("Username atau password salah!");
            setTimeout(() => {
              setError("");
              setLoading(false);
            }, 2000);
          } else {
            setError("Terjadi kesalahan saat login atau ulangi!");
            setTimeout(() => {
              setError("");
              setLoading(false);
            }, 2000);
          }
        }
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >
      <View style={styles.formBox}>
        <Image
          source={require("../assets/LOGO.png")}
          style={{ width: 300, height: 50 }}
        />
        <Text style={styles.title}>Smart Solutions for Safer Communities</Text>
        {error && (
          <View style={styles.errorField}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <Text style={styles.label}>Username :</Text>
        <View style={styles.inputField}>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
          />
        </View>
        <Text style={styles.label}>Password :</Text>
        <View style={styles.inputField}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={showPassword}
            style={styles.input}
          />
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={25}
            color={"#0B815A"}
            onPress={handleShowPassword}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>
            {loading ? <ActivityIndicator size={"small"} /> : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    flexDirection: "column",
    padding: 10,
  },
  formBox: {
    margin: 20,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "center",
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  errorField: {
    backgroundColor: "#EF4040",
    padding: 10,
    borderRadius: 10,
  },
  errorText: {
    color: "#FFF",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "#088395",
  },
  label: {
    marginTop: 5,
    marginBottom: 5,
  },
  inputField: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  input: {
    width: "85%",
  },
  button: {
    textAlign: "right",
    width: "100%",
    height: 50,
    backgroundColor: "#0B815A",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
