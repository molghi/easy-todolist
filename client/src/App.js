import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./custom.css";
import { useEffect, useContext } from "react";
// import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";
// import NotFound from "./components/NotFound";
import { Form } from "./components/Form";
import { Tasks } from "./components/Tasks";
import { Header } from "./components/Header";
import { AuthForm } from "./components/AuthForm";
import checkForCookie from "./utils/checkForCookie";
import MyContext from "./context/MyContext";

function App() {
    const { loggedIn, setLoggedIn, username, setUsername, setUserId } = useContext(MyContext);

    // const router = createBrowserRouter(
    //     createRoutesFromElements(
    //         <Route path="/" element={<MainLayout />}>
    //             <Route index path="/auth" element={<AuthForm />} />
    //             <Route
    //                 path="/tasks"
    //                 element={
    //                     <>
    //                         <Form />
    //                         <Tasks />
    //                     </>
    //                 }
    //             />
    //             <Route path="*" element={<NotFound />} />
    //         </Route>
    //     )
    // );

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "true") setLoggedIn(true);
        const usernameFromLS = localStorage.getItem("username");
        if (usernameFromLS && !username) setUsername(usernameFromLS);
        checkForCookie(setUserId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // return <RouterProvider router={router} />;

    return (
        <>
            <Header />
            {!loggedIn && <AuthForm />}
            {loggedIn && (
                <>
                    <Form />
                    <Tasks />
                </>
            )}
        </>
    );
}

export default App;
