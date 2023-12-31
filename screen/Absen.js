import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import React from "react";
import FormAbsen from "../components/FormAbsen";

export default function Absen() {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -6.280837731894491,
            longitude: 106.8394826451089,
            latitudeDelta: 0.001, // This sets the zoom level
            longitudeDelta: 0.001, // This sets the zoom level
          }}
        >
          <Marker
            key={1}
            coordinate={{
              latitude: -6.280837731894491,
              longitude: 106.8394826451089,
            }}
            title="Parkiran Mobil Depan Loby"
          >
            <Callout>
              <View>
                <Text>Lokasi : Parkiran Mobil depan Loby</Text>
                <Image
                  source={require("../assets/home.png")}
                  style={{ width: 100, height: 100 }}
                />
              </View>
            </Callout>
          </Marker>
        </MapView>
      </View>
      <View style={styles.bottomContent}>
        <FormAbsen />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: 500,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomContent: {
    marginTop: 20,
    flex: 1,
  },
});
