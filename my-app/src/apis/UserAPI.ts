import axios from "axios";

const apiUrls = {
  registerUser: "http://127.0.0.1:5000/register",
  loginUser: "http://127.0.0.1:5000/login",
  logoutUser: "http://127.0.0.1:5000/logout",
  refresh: "http://127.0.0.1:5000/refresh"
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
    console.log(res)
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

export {registerUser, loginUser, logoutUser}
