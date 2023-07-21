import AsyncStorage from "@react-native-async-storage/async-storage";

export function generateArrayOfYears() {
  var max = new Date().getFullYear();
  var min = max - 100;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
}

export const storeAsyncData = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, value);
  } catch (e) {
    console.log("errorasync", e);
    // saving error
  }
};

export const getAsyncData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value != null ? JSON.parse(value) : null;
    }
  } catch (e) {
    console.log("error");
    // error reading value
  }
};

export const removeAsyncData = async (key) => {
  try {
    const value = await AsyncStorage.removeItem(key);
    if (value !== null) {
      // value previously stored
      return value != null ? JSON.parse(value) : null;
    }
  } catch (e) {
    console.log("error");
    // error reading value
  }
};
