import axios from "axios";

const apiUrls = {
  registerUser: "https://api.skimify.ai/register",
  loginUser: "https://api.skimify.ai/login",
  logoutUser: "https://api.skimify.ai/logout",
  refresh: "https://api.skimify.ai/refresh"
}


const registerUser = async (user) => {
  try {

    const res = await axios.post(apiUrls.registerUser, {
      username: user.username,
      email: user.email,
      password: user.password
    });

  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

const loginUser = async (user) => {
  try {

    const res = await axios.post(apiUrls.loginUser, {
      email: user.email,
      password: user.password
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

const logoutUser = async (token) => {
  try {
    const res = await axios.post(apiUrls.logoutUser, {

      }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    );

  } catch (err) {
    throw new Error("Logout error")
  }
}

export {registerUser, loginUser, logoutUser}
