import { createContext, useState } from "react";

const MyContext = createContext();

export const ContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]); // fetched from db
    const [loading, setLoading] = useState(false); // loading sign
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [completedShown, setCompletedShown] = useState(false); // checkbox in Form
    const [uncompletedShown, setUncompletedShown] = useState(false); // checkbox in Form

    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    return (
        <MyContext.Provider
            value={{
                tasks,
                setTasks,
                loading,
                setLoading,
                loggedIn,
                setLoggedIn,
                username,
                setUsername,
                userId,
                setUserId,
                completedShown,
                setCompletedShown,
                uncompletedShown,
                setUncompletedShown,
                baseUrl,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
