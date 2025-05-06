import { useContext } from "react";
import MyContext from "../context/MyContext";
import axios from "axios";

export const Header = () => {
    const { loggedIn, setLoggedIn, username, setUsername } = useContext(MyContext);

    const logOut = async () => {
        try {
            const res = await axios.get("/auth/log-out", { withCredentials: true });
            console.log(res);
            if (res.status.toString().startsWith(2)) {
                setLoggedIn(false);
                setUsername("");
                localStorage.setItem("isLoggedIn", false);
                localStorage.setItem("username", "");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const capitalise = (value) => value[0].toUpperCase() + value.slice(1).toLowerCase();

    return (
        <div className="header margin-medium">
            <div className="container">
                <nav className="navbar bg-info rounded-bottom col-12 col-md-11 col-lg-11 col-xl-9 mx-auto">
                    <div className="container-fluid">
                        <h1 className="mb-0 fw-bold fs-2 py-2">To-Do List</h1>
                        {loggedIn && username && <span className="lead fw-bold">Hi {capitalise(username)}!</span>}
                        {loggedIn && (
                            <button onClick={logOut} className="btn bg-black text-info hover-opacity-75">
                                Log Out
                            </button>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
};
