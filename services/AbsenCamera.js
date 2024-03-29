import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { DateFormat } from "../utils/DateFormat";
import { TimeFormat } from "../utils/TimeFormat";
import { FontAwesome } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { getCurrentLocation } from "../utils/CurentLocation";

export default function AbsenCamera() {
  const absenRoute = useRoute();
  let cameraRef = useRef();
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [photo, setPhoto] = useState();
  const [username, setUsername] = useState([]);
  const [userId, setUserId] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("username")
      .then((value) => {
        if (value) {
          setUsername(value);
        }
      })
      .catch((error) => {});
    AsyncStorage.getItem("userId")
      .then((ID) => {
        if (ID) {
          setUserId(ID);
        }
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const currentLocation = await getCurrentLocation();
        setLocation(currentLocation);
      } catch (error) {
        console.error("Gagal mendapatkan koordinat", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
    console.log(photo);
  };
  if (photo) {
    const absenType = absenRoute.params?.absenType;
    navigation.navigate(absenType === "masuk" ? "AbsenMasuk" : "AbsenKeluar", {
      savedPhoto: photo,
    });
    setPhoto(undefined);
  }
  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );
  };
  return (
    <Camera style={styles.container} type={cameraType} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonFlex}>
          <TouchableOpacity onPress={takePic} style={styles.button}>
            <Text style={styles.buttonText}>
              <Ionicons name="radio-button-on-outline" size={80} />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleCameraType} style={styles.button}>
            <Text style={styles.buttonText}>
              {cameraType === Camera.Constants.Type.front ? (
                <Ionicons name="reload-outline" size={70} />
              ) : (
                <Ionicons
                  name="reload-outline"
                  size={70}
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  flexOverlay: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    padding: 5,
  },
  mapContainer: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  buttonFlex: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 0.4, // Sesuaikan lebar tombol
    margin: 10,
  },

  actionCam: {
    flexDirection: "row",
    height: 80,
    marginBottom: 20,
    marginTop: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
  },
  switchButton: {
    backgroundColor: "#4A7C59",
    padding: 10,
    borderRadius: 5,
  },
  switchButtonText: {
    color: "white",
  },
  buttonAction: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 100,
    margin: 10,
    height: 50,
    backgroundColor: "#088395",
  },
  icon: {
    width: 25,
    height: 25,
    margin: 5,
  },
  buttonText: {
    color: "#FFFFFF",
  },

  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
