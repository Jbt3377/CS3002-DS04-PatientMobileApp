import { Camera, CameraType } from "expo-camera";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";

import IonIcon from "react-native-vector-icons/Ionicons";
import { MediaLibrary } from "expo";

export default function WoundCaptureScreen({ navigation }) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();
  const [type, setType] = useState(CameraType.back);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  /**
   * useEffect checks App has camera permissions, and prompts the user if it does not
   */
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

  /**
   * Method toggles camera type between Front and Back
   */
  const toggleCameraType = () => {
    setIsButtonDisabled(true);
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
    setIsButtonDisabled(false);
  };

  /**
   * Method takes picture and updates the current photo
   */
  const handleTakePicture = async () => {
    setIsButtonDisabled(true);
    const options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    const newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
    setIsButtonDisabled(false);
  };

  const handleDiscardPicture = () => {
    setIsButtonDisabled(true);
    setPhoto(undefined);
    setIsButtonDisabled(false);
  };

  // Preview Mode
  if (photo) {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        >
          <SafeAreaView style={styles.previewModeBtnContainer}>
            <TouchableOpacity style={styles.btn} disabled={isButtonDisabled}>
              <IonIcon
                style={styles.btnIcon}
                name="checkmark-circle-outline"
                size={30}
              />
              <Text style={styles.btnText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              disabled={isButtonDisabled}
              onPress={() => handleDiscardPicture()}
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

  // Capture Mode
  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef} ratio={"16:9"}>
        <SafeAreaView style={styles.qrCodeTextContainer}>
          <View style={styles.qrCodeInstruction}>
            <Text style={styles.qrText}>Position QR Code within Box</Text>
          </View>
        </SafeAreaView>

        <SafeAreaView style={styles.qrCodeContainer}>
          <View style={styles.qrCodeOverlay} />
        </SafeAreaView>
        <SafeAreaView style={styles.captureModeBtnContainer}>
          <TouchableOpacity
            style={styles.btn}
            disabled={isButtonDisabled}
            onPress={() => handleTakePicture()}
          >
            <IonIcon style={styles.btnIcon} name="camera-outline" size={30} />
            <Text style={styles.btnText}>Take Pic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            disabled={isButtonDisabled}
            onPress={() => toggleCameraType()}
          >
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
  qrCodeContainer: {
    flex: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  qrCodeOverlay: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "white",
    width: 120,
    height: 120,
    marginBottom: 80,
  },
  captureModeBtnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 40,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  previewModeBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 35,
  },
  btn: {
    backgroundColor: "white",
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
  qrCodeTextContainer: {
    marginTop: 60,
    alignItems: "center",
  },
  qrCodeInstruction: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "grey",
    width: "70%",
    height: 50,
    marginBottom: 80,
  },
  qrText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
