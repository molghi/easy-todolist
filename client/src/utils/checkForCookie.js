import axios from "axios";

const checkForCookie = async () => {
    try {
        const res = await axios.get("http://localhost:5000/auth/verify", { withCredentials: true }); // check if there is the auth cookie
        if (res.data.message === "No auth cookie") {
            localStorage.setItem("isLoggedIn", false);
            localStorage.setItem("username", "");
            console.log("No auth cookie: reset LS");
        }
    } catch (err) {
        console.error(err);
    }
};

export default checkForCookie;
