import axios from "axios";

const resetLoggedIn = (setLoggedIn, setUsername) => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("username", "");
    setLoggedIn(false);
    setUsername("");
    console.log("No auth cookie: LS and React state were reset");
};

const checkForCookie = async (setUserId, baseUrl, setLoggedIn, setUsername) => {
    try {
        const res = await axios.get(`${baseUrl}/auth/verify`, { withCredentials: true }); // check if there is the auth cookie
        if (res.status !== 200) throw new Error("💥 Error verifying cookie");
        if (res.data.message === "No auth cookie") {
            resetLoggedIn(setLoggedIn, setUsername);
        } else {
            setUserId(res.data.message);
        }
    } catch (err) {
        if (err.response.data.message === "No auth cookie") resetLoggedIn(setLoggedIn, setUsername);
    }
};

export default checkForCookie;
