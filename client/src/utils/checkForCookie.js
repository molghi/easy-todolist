import axios from "axios";

const checkForCookie = async (setUserId) => {
    try {
        const res = await axios.get("/auth/verify", { withCredentials: true }); // check if there is the auth cookie
        if (res.data.message === "No auth cookie") {
            localStorage.setItem("isLoggedIn", false);
            localStorage.setItem("username", "");
            console.log("No auth cookie: reset LS");
        } else {
            setUserId(res.data.message);
        }
    } catch (err) {
        console.error(err);
    }
};

export default checkForCookie;
