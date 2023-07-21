import "firebase/compat/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { ADMIN_DATA, GET_ERRORS } from "../../types/types";
import { Alert } from "react-native";

export const getAdmin = (setLoading) => async (dispatch) => {
  setLoading(true);
  try {
    const db = getFirestore();
    const docRef = doc(db, "users", "07664DVAMVB268ktoycT");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch({
        type: ADMIN_DATA,
        payload: docSnap.data(),
      });
      setLoading(false);
    } else {
      // docSnap.data() will be undefined in this case
      // dispatch({ type: GET_ERRORS, payload: "No such document!" });

      console.log("No such document!");
      setLoading(false);
    }
  } catch (e) {
    dispatch({ type: GET_ERRORS, payload: e.message });
    console.log(e.message);
    setLoading(false);
  }
};

export const updateUserDataOnly =
  (id, data, navigation, setLoading) => async (dispatch) => {
    setLoading(true);
    const db = getFirestore();
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, data);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      dispatch({
        type: ADMIN_DATA,
        payload: docSnap.data(),
      });
      Alert.alert("Success", "Your Information has been updated", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Profile"),
        },
      ]);
      setLoading(false);
    } else {
      console.log("No such document!");
      alert("Sorry Something Went Wrong");
      setLoading(false);
    }
  };

export const updateImgFunc =
  (type, id, data, imgUri, navigation, setLoading) => async (dispatch) => {
    setLoading(true);
    try {
      const db = getFirestore();
      const userRef = doc(db, "users", id);

      if (type == "bothValid" || type == "imageValid") {
        const response = await fetch(imgUri);
        const blob = await response.blob();
        const storage = getStorage();
        const imageRef = ref(storage, "images/img" + id + ".jpg");
        uploadBytes(imageRef, blob)
          .then((snapshot) => {
            getDownloadURL(ref(storage, snapshot?.metadata?.fullPath))
              .then(async (url) => {
                await updateDoc(userRef, {
                  profile: { url: url },
                })
                  .then(async (res) => {
                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists()) {
                      if (type == "bothValid") {
                        await updateDoc(userRef, data);
                        const docSnap = await getDoc(userRef);

                        if (docSnap.exists()) {
                          dispatch({
                            type: ADMIN_DATA,
                            payload: docSnap.data(),
                          });
                          Alert.alert(
                            "Success",
                            "Your Information has been updated",
                            [
                              {
                                text: "OK",
                                onPress: () => navigation.navigate("Profile"),
                              },
                            ]
                          );
                          setLoading(false);
                        } else {
                          console.log("No such document!");
                          alert("Sorry Something Went Wrong");
                          setLoading(false);
                        }
                      } else {
                        Alert.alert(
                          "Success",
                          "Profile Picture has been updated",
                          [
                            {
                              text: "OK",
                              onPress: () => navigation.navigate("Profile"),
                            },
                          ]
                        );
                        setLoading(false);
                        dispatch({
                          type: ADMIN_DATA,
                          payload: docSnap.data(),
                        });
                      }
                    } else {
                      // doc.data() will be undefined in this case
                      console.log("No such document!");
                      alert("Something Went Wron!");
                      setLoading(false);
                    }
                    setLoading(false);
                  })
                  .catch((error) => {
                    setLoading(false);
                    const errorMessage = error.message;
                    dispatch({ type: GET_ERRORS, payload: errorMessage });
                    console.log("error" + errorMessage);
                  });
              })
              .catch((error) => {
                setLoading(false);
                dispatch({ type: GET_ERRORS, payload: error.message });
                console.log("here", error.message);
              });
          })
          .catch((e) => {
            setLoading(false);
            dispatch({ type: GET_ERRORS, payload: e.message });
            console.log("teheree", e.message);
          });
      } else if (type == "dataValid") {
        updateUserData(id, data, navigation, setLoading);
      } else {
        null;
      }
    } catch (e) {
      dispatch({ type: GET_ERRORS, payload: e.message });
      console.log(e.message);
      setLoading(false);
    }
  };

export const UpdateProfile =
  (id, data, imgUri, navigation, setLoading) => async (dispatch) => {
    setLoading(false);
    console.log(data, id, imgUri);

    if (!data) {
      updateImgFunc("noData", id, data, imgUri, navigation, setLoading);
    } else if (!imgUri) {
      updateImgFunc("noImg", id, data, imgUri, navigation, setLoading);
    } else {
      updateImgFunc("both", id, data, imgUri, navigation, setLoading);
    }
  };

export const _ResetPassword =
  (data, navigation, setLoading) => async (dispatch) => {
    let updateData = { password: data?.newPass };
    setLoading(true);
    try {
      const db = getFirestore();
      const docRef = doc(db, "users", "07664DVAMVB268ktoycT");
      await updateDoc(docRef, updateData);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch({
          type: ADMIN_DATA,
          payload: docSnap.data(),
        });
        Alert.alert("Success", "Your password has been changed", [
          { text: "OK", onPress: () => navigation.navigate("Profile") },
        ]);
        setLoading(false);
      } else {
        // docSnap.data() will be undefined in this case
        // dispatch({ type: GET_ERRORS, payload: "No such document!" });

        console.log("No such document!");
        setLoading(false);
      }
    } catch (e) {
      dispatch({ type: GET_ERRORS, payload: e.message });
      console.log(e.message);
      setLoading(false);
    }
  };
