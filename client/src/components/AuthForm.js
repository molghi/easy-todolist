import { useState, useRef, useEffect } from "react";
import axios from "axios";
import getAllFromDB from "../utils/getAllFromDB";

export const AuthForm = ({ setLoggedIn, setUsername, setUserId }) => {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [repeatPasswordInput, setRepeatPasswordInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [activeBlock, setActiveBlock] = useState(0); // tabs behaviour - 0 means Sign Up, 1 means Log In
    const signUpUsernameField = useRef();
    const logInUsernameField = useRef();

    const submitForm = async (e) => {
        try {
            let res;
            // let operation;
            e.preventDefault();
            const username = usernameInput;
            const password = passwordInput;
            const passwordRepeated = repeatPasswordInput;
            console.log(username, password, passwordRepeated);

            const usernameIsFine = /^[A-Za-z][A-Za-z0-9]{2,}$/.test(username); // Some front-end validation
            const passwordIsFine = /^[A-Za-z0-9]{8,}$/.test(password);
            if (!usernameIsFine)
                return setErrorMsg("Username must start with a letter, contain only alphanumerics, and be at least 3 chars long");
            if (!passwordIsFine) return setErrorMsg("Password must contain only alphanumeric chars and be at least 8 chars long");

            if (!passwordRepeated) {
                setErrorMsg(""); // case: submitting log in form
                // operation = "log-in";
                res = await axios.post(
                    "http://localhost:5000/auth/log-in",
                    { username, password },
                    { withCredentials: true } /* to include the cookie in subsequent requests */
                );
            } else {
                const passwordsMatch = password === passwordRepeated; // case: submitting sign up form
                if (!passwordsMatch) return setErrorMsg("Passwords do not match");
                setErrorMsg("");
                res = await axios.post(
                    "http://localhost:5000/auth/sign-up",
                    { username, password, passwordRepeated },
                    { withCredentials: true } /* to include the cookie in subsequent requests */
                );
            }

            console.log(res);

            if (res.status.toString().startsWith("2")) {
                setLoggedIn(true); // if successful
                setUsername(res.data.username);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("username", res.data.username);
                console.log(`Operation successful: token stored in cookie`);
                if (res.data.userId) setUserId(res.data.userId);
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setErrorMsg(error.response?.data.message);
        }
    };

    useEffect(() => {
        if (activeBlock === 0) signUpUsernameField.current.focus(); // focus the first input field
        else logInUsernameField.current.focus();
    }, [activeBlock]);

    const handleTabSwitch = (activeTabNum) => {
        setActiveBlock(activeTabNum);
        setUsernameInput("");
        setPasswordInput("");
        setRepeatPasswordInput("");
        setErrorMsg("");
    };

    return (
        <div className="auth-form">
            <div className="container">
                <div className="auth-form__wrapper col-12 col-md-9 col-lg-9 col-xl-7 mx-auto">
                    <h3 className="card p-3 mb-4 shadow-sm bg-warning text-center">
                        <strong>Sign Up or Log In to Manage Your Tasks</strong>
                    </h3>

                    {/* TAB HEADERS */}
                    <ul className="nav nav-tabs mb-4">
                        <li className="nav-item">
                            <button
                                onClick={() => handleTabSwitch(0)}
                                className={`nav-link ${activeBlock === 0 ? "active" : "text-white"}`}
                            >
                                Sign Up
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                onClick={() => handleTabSwitch(1)}
                                className={`nav-link ${activeBlock === 1 ? "active" : "text-white"}`}
                            >
                                Log In
                            </button>
                        </li>
                    </ul>

                    {/* TAB CONTENTS */}
                    <div className="tab-content mt-3">
                        {/* TAB 1 */}
                        <div className={`tab-pane fade ${activeBlock === 0 ? "show active" : ""}`}>
                            <form className="text-light col-12 col-sm-7 col-md-6 mx-auto" onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputUsername1" className="form-label">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control outline-lighter"
                                        id="exampleInputUsername1"
                                        aria-describedby="usernameHelp"
                                        autoFocus
                                        required
                                        value={usernameInput}
                                        onChange={(e) => setUsernameInput(e.target.value)}
                                        ref={signUpUsernameField}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control outline-lighter"
                                        id="exampleInputPassword1"
                                        required
                                        value={passwordInput}
                                        onChange={(e) => setPasswordInput(e.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="exampleInputPassword2" className="form-label">
                                        Repeat Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control outline-lighter"
                                        id="exampleInputPassword2"
                                        required
                                        value={repeatPasswordInput}
                                        onChange={(e) => setRepeatPasswordInput(e.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                                <button type="submit" className="btn btn-info hover-opacity-75 btn-clicked">
                                    <strong>Sign Up</strong>
                                </button>
                            </form>
                        </div>
                        {/* TAB 2 */}
                        <div className={`tab-pane fade ${activeBlock === 1 ? "show active" : ""}`}>
                            <form className="text-light col-12 col-sm-7 col-md-6 mx-auto" onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputUsername2" className="form-label">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control outline-lighter"
                                        id="exampleInputUsername2"
                                        aria-describedby="usernameHelp"
                                        autoFocus
                                        required
                                        value={usernameInput}
                                        onChange={(e) => setUsernameInput(e.target.value)}
                                        ref={logInUsernameField}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="exampleInputPassword3" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control outline-lighter"
                                        id="exampleInputPassword3"
                                        required
                                        value={passwordInput}
                                        onChange={(e) => setPasswordInput(e.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                                <button type="submit" className="btn btn-info hover-opacity-75 btn-clicked">
                                    <strong>Log In</strong>
                                </button>
                            </form>
                        </div>
                    </div>

                    {errorMsg && <div className="card mt-5 p-3 bg-danger text-white">Error: {errorMsg}</div>}
                </div>
            </div>
        </div>
    );
};
