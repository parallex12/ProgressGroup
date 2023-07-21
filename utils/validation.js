export const validateAdmin = (user, confirmUser) => {
  console.log("validation", user, confirmUser);
  return new Promise(function (resolve, reject) {
    if (user?.sin == "" && user?.phone == "" && user?.password == "") {
      reject(Error("Please enter all fields"));
    } else if (user?.sin == "") {
      reject(Error("SIN cannot be empty"));
    } else if (user?.phone == "") {
      reject(Error("Phone cannot be empty"));
    } else if (user?.password == "") {
      reject(Error("Password cannot be empty"));
    } else if (user?.sin != confirmUser.sin) {
      reject(Error("Incorrect SIN"));
    } else if (user?.phone != confirmUser.phone) {
      reject(Error("Incorrect Phone"));
    } else if (user?.password != confirmUser.password) {
      reject(Error("Incorrect Password"));
    } else {
      resolve("validated");
    }
  });
};

export const validateUpdateInfo = (user, prevUser, image) => {
  let match =
    user?.firstName != prevUser?.firstName ||
    user?.lastName != prevUser?.lastName ||
    user?.phone != prevUser?.phone ||
    user?.sin != prevUser?.sin ||
    user?.address != prevUser?.address;
  return new Promise(function (resolve, reject) {
    if (match && !image) {
      resolve("dataValid");
    }
    if (image && !match) {
      resolve("imageValid");
    }

    if (match && image) {
      resolve("bothValid");
    } else {
      reject(Error("Same Fields"));
    }
  });
};

export const validateOldPass = (user, oldPass) => {
  console.log(oldPass);
  return new Promise(function (resolve, reject) {
    if (oldPass != user?.oldPass) {
      reject(Error("Old Password is Incorrect"));
    }
    if (user?.oldPass?.length < 8 || user?.newPass?.length < 8) {
      reject(Error("Password Cannot be less than 8 digits"));
    } else {
      resolve("validated");
    }
  });
};
