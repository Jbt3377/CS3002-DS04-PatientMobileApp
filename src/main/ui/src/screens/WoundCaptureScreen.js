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
import { REACT_APP_LOCAL_BACKEND_BASE_URL } from "@env";
import { auth } from "../../Firebase";

export default function WoundCaptureScreen({ navigation }) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [isFlashEnabled, setIsFlashEnabled] = useState(false);
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
    setIsFrontCamera(!isFrontCamera);
    setIsButtonDisabled(false);
  };

  /**
   * Method toggles flash on and off
   */
  const toggleFlash = () => {
    setIsButtonDisabled(true);
    setIsFlashEnabled(!isFlashEnabled);
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

  /**
   * Method resets the current photo
   */
  const handleDiscardPicture = () => {
    setIsButtonDisabled(true);
    setPhoto(undefined);
    setIsButtonDisabled(false);
  };

  const handleSendPicture = async () => {
    setIsButtonDisabled(true);

    let formData = new FormData();
    formData.append("uid", auth.currentUser.uid);
    formData.append("woundId", "test");
    formData.append("captureDate", (new Date()).toString());
    formData.append(
      "photo", {
        uri: photo.uri,
        type: "image/jpeg",
        name: "photo.jpg"
      }
    );

    console.log("Form Data:")
    console.log(formData);

    await fetch(
      REACT_APP_LOCAL_BACKEND_BASE_URL +
        "/api/woundCapture/create",
      {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
        },
        body: formData,
      }
    )
      .catch(err => {
          console.log(err);
      })

    // await fetch(
    //     REACT_APP_LOCAL_BACKEND_BASE_URL +
    //       "/api/woundCapture/create",
    //     {
    //       method: "POST",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         uid: auth.currentUser.uid,
    //         woundId: "test",
    //         captureDate: new Date(),
            

    //       }),
    //     }
    //   )
    //     .then(response => {
    //       console.log('Response:', response);
    //     })
    //     .catch((error) => {
    //       console.log('Error: ' + error.message);
    //     });

    console.log("Complete");
    setIsButtonDisabled(false);
  };

  // Preview Mode
  if (photo) {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.pictureBackground}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        >
          <SafeAreaView style={styles.previewModeBtnContainer}>
            <TouchableOpacity
              style={styles.mediumBtn}
              disabled={isButtonDisabled}
              onPress={() => handleSendPicture()}
            >
              <IonIcon
                style={styles.btnIcon}
                name="checkmark-circle-outline"
                size={30}
              />
              <Text style={styles.btnText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mediumBtn}
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

  const flashBtn = {
    backgroundColor: isFlashEnabled ? "grey" : "white",
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  };

  const cameraTypeBtn = {
    backgroundColor: isFrontCamera ? "grey" : "white",
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  };

  // Capture Mode
  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.cameraBackground}
        type={isFrontCamera ? CameraType.front : CameraType.back}
        flashMode={
          isFlashEnabled
            ? Camera.Constants.FlashMode.torch
            : Camera.Constants.FlashMode.off
        }
        ref={cameraRef}
        ratio={"16:9"}
      >
        <SafeAreaView style={styles.qrCodeInstructionContainer}>
          <View style={styles.qrCodeInstructionShape}>
            <Text style={styles.qrCodeInstructionText}>Position QR Code within Box</Text>
          </View>
        </SafeAreaView>

        <SafeAreaView style={styles.qrCodeOverlayContainer}>
          <View style={styles.qrCodeOverlay} />
        </SafeAreaView>
        <SafeAreaView style={styles.captureModeBtnContainer}>
          <TouchableOpacity
            style={cameraTypeBtn}
            disabled={isButtonDisabled}
            onPress={() => toggleCameraType()}
          >
            <IonIcon name="camera-reverse-outline" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.largeBtn}
            disabled={isButtonDisabled}
            onPress={() => handleTakePicture()}
          >
            <IonIcon style={styles.btnIcon} name="camera-outline" size={30} />
            <Text style={styles.btnText}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={flashBtn}
            disabled={isButtonDisabled}
            onPress={() => toggleFlash()}
          >
            <IonIcon name="flashlight-outline" size={30} />
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
  cameraBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  qrCodeInstructionContainer: {
    marginTop: 60,
    alignItems: "center",
  },
  qrCodeInstructionShape: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "grey",
    width: "70%",
    height: 50,
    marginBottom: 80,
  },
  qrCodeInstructionText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  qrCodeOverlayContainer: {
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
  pictureBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  previewModeBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 35,
  },
  largeBtn: {
    backgroundColor: "white",
    width: 200,
    height: 50,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mediumBtn: {
    backgroundColor: "white",
    width: 150,
    height: 50,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btnText: {
    justifyContent: "flex-start",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  btnIcon: {
    padding: 5,
    marginHorizontal: "5%",
  },
});
