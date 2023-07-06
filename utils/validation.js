export const validateUser = (user) => {
  if (
    user?.sin === "12345678" &&
    user?.number === "12345678" &&
    user?.password === "12345678"
  ) {
    return true;
  } else {
    alert("Please Enter Correct Details");
  }
};
