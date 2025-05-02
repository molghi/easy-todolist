import axios from "axios";

const getAllFromDB = async (setTasks, setLoading) => {
    try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/todos"); // hit the established route on the back-end, fetch all
        setLoading(false);
        setTasks(res.data); // change react state
    } catch (err) {
        console.error("💥💥💥", err);
    }
};

export default getAllFromDB;
