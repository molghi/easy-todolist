import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./custom.css";
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Form } from "./components/Form";
import { Tasks } from "./components/Tasks";
import { AuthForm } from "./components/AuthForm";
import checkForCookie from "./utils/checkForCookie";

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    // console.log(tasks);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "true") setLoggedIn(true);
        const usernameFromLS = localStorage.getItem("username");
        if (usernameFromLS && !username) setUsername(usernameFromLS);
        checkForCookie(setUserId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} username={username} setUsername={setUsername} />
            {!loggedIn && (
                <AuthForm
                    setLoggedIn={setLoggedIn}
                    setUsername={setUsername}
                    setTasks={setTasks}
                    setLoading={setLoading}
                    userId={userId}
                    setUserId={setUserId}
                />
            )}
            {loggedIn && <Form setTasks={setTasks} setLoading={setLoading} userId={userId} />}
            {loggedIn && <Tasks tasks={tasks} setTasks={setTasks} loading={loading} setLoading={setLoading} userId={userId} />}
        </>
    );
}

export default App;
