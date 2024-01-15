import React, { useState } from "react";
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Profil = () => {
  const [password, setPassword] = useState("user123");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("Lonnie Murphy");
  const [email, setEmail] = useState("lonniem@gmail.com");
  const [phone, setPhone] = useState("+1 890 7890 678");
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container}>
        <View style={styles.sectionImage}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/person.jpg")}
              style={{ width: 90, height: 80, borderRadius: 50 }}
            />
            <Text style={styles.title}>Lonnie</Text>
            <Text style={styles.subTitle}>Security</Text>
          </View>
        </View>
        <View style={styles.sectionForm}>
          <View>
            <Text style={styles.label}>Username</Text>
            <View style={styles.form}>
              <MaterialCommunityIcons name="account" size={24} />
              <TextInput value={username} style={styles.formInput} />
            </View>
            <Text style={styles.label}>Email</Text>
            <View style={styles.form}>
              <MaterialCommunityIcons name="email" size={24} />
              <TextInput value={email} style={styles.formInput} />
            </View>
            <Text style={styles.label}>Password</Text>
            <View style={styles.form}>
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                onPress={toggleShowPassword}
              />
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.formInput}
              />
            </View>
            <Text style={styles.label}>Phone</Text>
            <View style={styles.form}>
              <MaterialCommunityIcons name="phone" size={24} />
              <TextInput value={phone} style={styles.formInput} />
            </View>
            <TouchableOpacity style={styles.submitForm}>
              <Text style={styles.sumbitText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionImage: {
    marginTop: 10,
  },
  title: {
    marginTop: 10,
  },
  subTitle: {
    color: "grey",
  },
  imageContainer: {
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  sectionForm: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
  },
  formInput: {
    color: "#000000",
    width: "100%",
    borderRadius: 20,
    paddingLeft: 10,
    height: 30,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  form: {
    backgroundColor: "#D8D9DA",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    borderRadius: 20,
  },
  submitForm: {
    marginTop: 20,
    backgroundColor: "#0B815A",
    height: 50,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 20,
  },
  sumbitText: {
    color: "#FFF",
    fontSize: 16,
  },
});
