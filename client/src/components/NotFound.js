import { Link } from "react-router-dom";
import { useContext } from "react";
import MyContext from "../context/MyContext";

const NotFound = () => {
    const { loggedIn } = useContext(MyContext);
    const path = loggedIn ? "/tasks" : "/auth";

    return (
        <div className="not-found">
            <div className="container">
                <div className="not-found__wrapper col-12 col-md-11 col-lg-11 col-xl-9 mx-auto text-white text-center">
                    <div style={{ fontSize: "200px", fontWeight: "bold", lineHeight: "1.2" }}>404</div>
                    <div style={{ fontSize: "60px" }}>Page Not Found</div>
                    <Link to={path} className="btn mt-5 bg-info fw-bold p-2 px-3">
                        Go Back
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
