import { Camera, CameraType } from "expo-camera";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";

import IonIcon from "react-native-vector-icons/Ionicons";

export default function WoundCaptureScreen({ navigation }) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
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

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
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
  };

  if (photo) {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        >
          <SafeAreaView style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn}>
              <IonIcon
                style={styles.btnIcon}
                name="checkmark-circle-outline"
                size={30}
              />
              <Text style={styles.btnText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setPhoto(undefined)}
            >
              <IonIcon
                style={styles.btnIcon}
                name="close-circle-outline"
                size={30}
              />
              <Text style={styles.btnText}>Discard</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <SafeAreaView style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={takePic}>
            <IonIcon style={styles.btnIcon} name="camera-outline" size={30} />
            <Text style={styles.btnText}>Take Pic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={toggleCameraType}>
            <IonIcon
              style={styles.btnIcon}
              name="camera-reverse-outline"
              size={30}
            />
            <Text style={styles.btnText}>Reverse</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
  },
  btnContainer: {
    flexDirection: "row",
    backgroundColor: "ffffff",
    justifyContent: "space-evenly",
    marginBottom: 50,
  },
  btn: {
    backgroundColor: "#ffffff",
    width: 150,
    height: 50,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btnText: {
    flex: 3,
    justifyContent: "flex-start",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  btnIcon: {
    flex: 1,
    padding: 5,
    marginHorizontal: "5%",
  },
});
