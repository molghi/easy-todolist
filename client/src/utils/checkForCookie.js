import axios from "axios";

const resetLoggedIn = (setLoggedIn, setUsername) => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("username", "");
    setLoggedIn(false);
    setUsername("");
    // console.log("No auth cookie: reset LS and in React");
};

const checkForCookie = async (setUserId, baseUrl, setLoggedIn, setUsername) => {
    console.log(`checkForCookie`);
    try {
        const res = await axios.get(`${baseUrl}/auth/verify`, { withCredentials: true }); // check if there is the auth cookie
        console.log(res);
        console.log(res.data.message);
        console.log(res.response.data.message);
        if (res.data.message === "No auth cookie" || res.response.data.message === "No auth cookie") {
            resetLoggedIn(setLoggedIn, setUsername);
        } else {
            setUserId(res.data.message);
        }
    } catch (err) {
        console.error(err);
        if (err.response.data.message === "No auth cookie") resetLoggedIn(setLoggedIn, setUsername);
    }
};

export default checkForCookie;
